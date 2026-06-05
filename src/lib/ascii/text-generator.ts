import figlet from "figlet";

export const FONT_LIST = [
  "Standard",
  "Ghost",
  "Slant",
  "ANSI Shadow",
  "Block",
  "Doom"
];

// Helper to load font dynamically since we are client-side only
// and don't want to bundle all fonts
export async function loadFont(fontName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((figlet as any).figFonts && (figlet as any).figFonts[fontName]) {
      resolve();
      return;
    }

    figlet.defaults({ fontPath: "/fonts" });

    // We fetch the font file as text
    fetch(`/fonts/${encodeURIComponent(fontName)}.flf`)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not fetch font ${fontName}`);
        return res.text();
      })
      .then((text) => {
        figlet.parseFont(fontName, text);
        resolve();
      })
      .catch(reject);
  });
}

export async function generateAsciiText(
  text: string,
  fontName: string = "Standard"
): Promise<string> {
  if (!text) return "";

  await loadFont(fontName);

  return new Promise((resolve, reject) => {
    figlet.text(
      text,
      {
        font: fontName as figlet.Fonts,
      },
      (err, result) => {
        if (err) {
          console.error("Figlet error:", err);
          reject(err);
          return;
        }
        resolve(result || "");
      }
    );
  });
}
