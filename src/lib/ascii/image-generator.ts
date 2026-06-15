export interface ImageAsciiOptions {
  density: string;
  invert: boolean;
  contrast: number;
  brightness: number;
  scale: number;
  engine?: "standard" | "braille" | "ansi-color";
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

      let asciiStr = "";

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

            const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
            const charIndex = Math.round((brightness / 255) * charLen);
            const char = charSet[charIndex];

            // For ANSI preview, we will generate raw chars in JS, and inject HTML rendering at the UI layer.
            // But wait, the prompt specifically said ANSI output is a must. If the UI expects a string,
            // we should encode it as HTML for preview?
            // Actually, we can return a JSON representation or a specialized token format if needed,
            // but for simplicity and safety, let's keep the ANSI escape codes here and parse them in the UI for display!
            asciiStr += `\x1b[38;2;${r};${g};${b}m${char}\x1b[0m`;
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
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b);

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
