export interface ImageAsciiOptions {
  density: string;
  invert: boolean;
  contrast: number;
  brightness: number;
  scale: number;
}

export const DENSITY_SETS = {
  standard: " .:-=+*#%@",
  complex: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  blocks: " ░▒▓█",
  binary: " 01",
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
      const maxWidth = Math.min(150, img.width * options.scale);
      const ratio = img.width / img.height;
      const width = maxWidth;
      const height = Math.max(1, Math.round((width / ratio) * 0.5));

      canvas.width = width;
      canvas.height = height;

      // Draw and apply simple brightness/contrast
      ctx.filter = `brightness(${options.brightness}%) contrast(${options.contrast}%)`;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      let asciiStr = "";
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

      resolve(asciiStr);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
}
