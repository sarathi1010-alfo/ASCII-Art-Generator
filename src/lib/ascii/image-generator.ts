export interface ImageAsciiOptions {
  density: string;
  invert: boolean;
  contrast: number;
  brightness: number;
  scale: number;
  engine?: "standard" | "braille" | "ansi-color";
  dithering?: "none" | "floyd-steinberg" | "atkinson";
  colorMode?: "original" | "fire" | "ice" | "matrix";
}

export const DENSITY_SETS = {
  standard: " .:-=+*#%@",
  complex: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  blocks: " ░▒▓█",
  binary: " 01",
  matrix: " 01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ",
};

export async function generateAsciiFromImage(
  imageUrl: string,
  options: ImageAsciiOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Calculate new dimensions based on scale
      // Keep width bounded to prevent massive text output
      // We multiply height by ~0.5 to account for character aspect ratio (fonts are taller than they are wide)
      const engine = options.engine || "standard";

      const maxWidth = Math.min(engine === "braille" ? 300 : 150, img.width * options.scale);
      const ratio = img.width / img.height;
      let width = maxWidth;

      // Braille maps a 2x4 pixel grid to 1 character, which naturally handles aspect ratio.
      // Standard ASCII needs a 0.5 height multiplier because fonts are taller than they are wide.
      let height = engine === "braille"
        ? Math.max(1, Math.round(width / ratio))
        : Math.max(1, Math.round((width / ratio) * 0.5));

      if (engine === "braille") {
        // Ensure width is multiple of 2 and height is multiple of 4
        width = Math.floor(width / 2) * 2;
        height = Math.floor(height / 4) * 4;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and apply simple brightness/contrast
      ctx.filter = `brightness(${options.brightness}%) contrast(${options.contrast}%)`;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      // Apply dithering if selected
      if (options.dithering && options.dithering !== "none") {
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            const r = pixels[offset];
            const g = pixels[offset + 1];
            const b = pixels[offset + 2];
            const a = pixels[offset + 3];

            if (a === 0) continue;

            const oldPixel = (0.299 * r + 0.587 * g + 0.114 * b);
            // Quantize to closest of e.g. 8 levels
            const levels = 8;
            const newPixel = Math.round((oldPixel / 255) * levels) * (255 / levels);
            const quantError = oldPixel - newPixel;

            pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = newPixel; // Update brightness map in place

            if (options.dithering === "floyd-steinberg") {
              if (x + 1 < width) {
                pixels[((y) * width + x + 1) * 4] += quantError * (7 / 16);
                pixels[((y) * width + x + 1) * 4 + 1] += quantError * (7 / 16);
                pixels[((y) * width + x + 1) * 4 + 2] += quantError * (7 / 16);
              }
              if (x - 1 >= 0 && y + 1 < height) {
                pixels[((y + 1) * width + x - 1) * 4] += quantError * (3 / 16);
                pixels[((y + 1) * width + x - 1) * 4 + 1] += quantError * (3 / 16);
                pixels[((y + 1) * width + x - 1) * 4 + 2] += quantError * (3 / 16);
              }
              if (y + 1 < height) {
                pixels[((y + 1) * width + x) * 4] += quantError * (5 / 16);
                pixels[((y + 1) * width + x) * 4 + 1] += quantError * (5 / 16);
                pixels[((y + 1) * width + x) * 4 + 2] += quantError * (5 / 16);
              }
              if (x + 1 < width && y + 1 < height) {
                pixels[((y + 1) * width + x + 1) * 4] += quantError * (1 / 16);
                pixels[((y + 1) * width + x + 1) * 4 + 1] += quantError * (1 / 16);
                pixels[((y + 1) * width + x + 1) * 4 + 2] += quantError * (1 / 16);
              }
            } else if (options.dithering === "atkinson") {
              const distribute = (dx: number, dy: number, factor: number) => {
                if (x + dx >= 0 && x + dx < width && y + dy < height) {
                  pixels[((y + dy) * width + x + dx) * 4] += quantError * factor;
                  pixels[((y + dy) * width + x + dx) * 4 + 1] += quantError * factor;
                  pixels[((y + dy) * width + x + dx) * 4 + 2] += quantError * factor;
                }
              };
              distribute(1, 0, 1/8);
              distribute(2, 0, 1/8);
              distribute(-1, 1, 1/8);
              distribute(0, 1, 1/8);
              distribute(1, 1, 1/8);
              distribute(0, 2, 1/8);
            }
          }
        }
      }

      let asciiStr = "";

      const getGradientColor = (brightness: number, mode: string) => {
        let r = 255, g = 255, b = 255;
        const norm = brightness / 255;
        if (mode === "fire") {
          r = 255;
          g = Math.floor(norm * 255);
          b = Math.floor(Math.max(0, norm * 2 - 1) * 255);
        } else if (mode === "ice") {
          r = Math.floor(Math.max(0, norm * 2 - 1) * 255);
          g = Math.floor(norm * 255);
          b = 255;
        } else if (mode === "matrix") {
          r = 0;
          g = Math.floor(norm * 255);
          b = 0;
        }
        return [r, g, b];
      };

      if (engine === "braille") {
        const threshold = options.invert ? 100 : 128; // inverted means white background

        for (let y = 0; y < height; y += 4) {
          for (let x = 0; x < width; x += 2) {
            // Mapping to Braille Unicode characters: \u2800 to \u28FF
            // Array of offsets for braille dots
            const dotOffsets = [
              [0, 0], [0, 1], [0, 2], [1, 0],
              [1, 1], [1, 2], [0, 3], [1, 3]
            ];

            let brailleCode = 0x2800; // empty braille character

            for (let i = 0; i < 8; i++) {
              const dx = dotOffsets[i][0];
              const dy = dotOffsets[i][1];

              if (x + dx < width && y + dy < height) {
                const offset = ((y + dy) * width + (x + dx)) * 4;
                const r = pixels[offset];
                const g = pixels[offset + 1];
                const b = pixels[offset + 2];
                const a = pixels[offset + 3];

                const pixelBrightness = (0.299 * r + 0.587 * g + 0.114 * b);

                let isDot = false;
                if (a === 0) {
                  isDot = options.invert;
                } else {
                  isDot = options.invert ? pixelBrightness > threshold : pixelBrightness < threshold;
                }

                if (isDot) {
                  brailleCode += (1 << i);
                }
              }
            }
            asciiStr += String.fromCharCode(brailleCode);
          }
          asciiStr += "\n";
        }
      } else if (engine === "ansi-color") {
        const charSet = options.invert
          ? options.density.split("").reverse().join("")
          : options.density;
        const charLen = charSet.length - 1;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            const r = pixels[offset];
            const g = pixels[offset + 1];
            const b = pixels[offset + 2];
            const a = pixels[offset + 3];

            if (a === 0) {
              asciiStr += options.invert ? charSet[charLen] : charSet[0];
              continue;
            }

            let brightness = (0.299 * r + 0.587 * g + 0.114 * b);
            // In dithering mode, pixel brightness is modified and RGB are set to the new brightness
            if (options.dithering && options.dithering !== "none") {
              brightness = r; // They were set to the same in dithering step
            }

            // Clamp brightness to 0-255 just in case dithering pushed it out
            brightness = Math.max(0, Math.min(255, brightness));

            const charIndex = Math.round((brightness / 255) * charLen);
            const char = charSet[charIndex];

            let outR = r, outG = g, outB = b;
            if (options.colorMode && options.colorMode !== "original") {
              [outR, outG, outB] = getGradientColor(brightness, options.colorMode);
            }

            asciiStr += `\x1b[38;2;${outR};${outG};${outB}m${char}\x1b[0m`;
          }
          asciiStr += "\n";
        }
      } else {
        const charSet = options.invert
          ? options.density.split("").reverse().join("")
          : options.density;

        const charLen = charSet.length - 1;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            const r = pixels[offset];
            const g = pixels[offset + 1];
            const b = pixels[offset + 2];
            const a = pixels[offset + 3];

            // If transparent, treat as white or black based on invert
            if (a === 0) {
              asciiStr += options.invert ? charSet[charLen] : charSet[0];
              continue;
            }

            // Calculate brightness (standard perceptual weighting)
            let brightness = (0.299 * r + 0.587 * g + 0.114 * b);
            if (options.dithering && options.dithering !== "none") {
              brightness = r;
            }
            brightness = Math.max(0, Math.min(255, brightness));

            // Map to character
            const charIndex = Math.round((brightness / 255) * charLen);
            asciiStr += charSet[charIndex];
          }
          asciiStr += "\n";
        }
      }

      resolve(asciiStr);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
}
