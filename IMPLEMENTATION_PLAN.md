# Creative Terminal Art Platform - Implementation Plan

This document outlines the architectural strategy and phased roadmap to transform the basic image-to-ASCII tool into a cult hacker playground and creative terminal art platform. All processing remains strictly local and browser-based (zero backend dependencies), enforcing user privacy and high performance.

## 1. UI/UX Principles: Terminal-Native & Keyboard-Driven

- **Atmosphere First**: The interface should evoke retro-futurism and hacker culture. Think deep blacks, glowing CRT greens, amber monochromes, and glitch effects.
- **Keyboard-First Navigation**:
  - `Arrow Keys`: Adjust density, brightness, and contrast.
  - `Spacebar`: Randomize parameters.
  - `C`: Copy current result.
  - `T`: Cycle through themes (Terminal Green, Cyberpunk Neon, Retro DOS).
  - `E`: Switch rendering engine.
- **Frictionless Real-Time Feedback**: Any parameter change immediately regenerates the preview. We use Web Workers or optimized `useDeferredValue` hooks to ensure the main UI thread never blocks during generation.
- **One-Click Exports**: Easily discoverable buttons for "Copy for Discord", "Copy as Markdown", "Copy ANSI", and "Download as .txt".

## 2. Core Logic & Multiple Render Engines (Pseudo-code)

The core logic expands beyond standard character mapping into specialized rendering engines.

```javascript
// Pseudo-code for Render Engine Selection
function generateArt(pixels, width, height, options) {
  switch (options.engine) {
    case 'braille':
      return renderBraille(pixels, width, height, options.threshold);
    case 'matrix':
      return renderMatrix(pixels, width, height);
    case 'ansi-color':
      return renderANSIColor(pixels, width, height, options.density);
    case 'standard':
    default:
      return renderStandardAscii(pixels, width, height, options.densityMap);
  }
}

// Pseudo-code for Braille Engine (2x4 pixel blocks -> 1 Braille Char)
function renderBraille(pixels, width, height, threshold) {
  let result = "";
  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 2) {
      let brailleCode = 0x2800;
      // Map 8 pixels in 2x4 grid to Braille dot matrix positions
      if (getPixelBrightness(x, y) > threshold) brailleCode += 1;
      if (getPixelBrightness(x, y+1) > threshold) brailleCode += 2;
      if (getPixelBrightness(x, y+2) > threshold) brailleCode += 4;
      if (getPixelBrightness(x+1, y) > threshold) brailleCode += 8;
      // ... and so on for the remaining 4 dots
      result += String.fromCharCode(brailleCode);
    }
    result += "\n";
  }
  return result;
}

// Pseudo-code for ANSI Color Engine
function renderANSIColor(pixels, width, height, densityMap) {
  let result = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, b] = getRGB(x, y);
      const brightness = calculateBrightness(r, g, b);
      const char = mapToChar(brightness, densityMap);
      // Generate ANSI 24-bit color escape sequence
      result += `\x1b[38;2;${r};${g};${b}m${char}\x1b[0m`;
    }
    result += "\n";
  }
  return result;
}
```

## 3. Data Models for Gallery & Local Storage

Since there is no backend, we rely on LocalStorage / IndexedDB for user creations, and static JSON for the public gallery.

```typescript
// Local User Creations (IndexedDB via Dexie.js or LocalStorage)
interface LocalArtwork {
  id: string; // UUID
  createdAt: number; // Timestamp
  title: string;
  type: "image-to-ascii" | "text-to-ascii" | "animation";
  rawText: string;
  config: {
    engine: string;
    density: string;
    theme: string;
    // ...other parameters
  };
  thumbnailDataUrl?: string; // Small preview image for gallery
}

// Public Gallery Data Model (Static JSON served at build time)
interface PublicGalleryItem {
  slug: string;
  title: string;
  author: string;
  tags: string[]; // e.g., ["cyberpunk", "matrix", "skull"]
  previewImage: string; // URL to optimized static image
  seoMeta: {
    title: string;
    description: string;
  };
  rawContent: string;
}
```

## 4. PWA Setup for Offline Use

The platform must function offline, enabling users to create art anywhere.

1. **Manifest**: Add `manifest.json` defining the app as "Terminal Art Studio" with retro icon sets.
2. **Service Worker**: Use Workbox to cache the Next.js static assets, fonts (especially monospace web fonts like JetBrains Mono), and local image processing scripts.
3. **Local First**: Because all logic (Canvas API for image processing, Figlet for text) is client-side, the app works natively offline once cached.

## 5. SEO Page Architecture

Target long-tail keywords using programmatic SEO and static MDX/JSON routes.

- `/image-to-ascii` -> "Image to ASCII Art Generator"
- `/text-to-ascii` -> "ASCII Text & Banner Generator"
- `/ascii-art-generator` -> Main landing page / Hub
- `/matrix-text-generator` -> Dedicated page for Matrix-style rendering
- `/github-ascii-art` -> Templates and tools for GitHub README banners
- `/discord-ascii-art` -> Tools optimized for Discord chat formatting and avatars
- `/gallery/[slug]` -> Individual viral artworks acting as landing pages

## 6. Phased Roadmap

### Phase 1: The Core Hacker Engine (Highest-ROI)
- Upgrade Image-to-ASCII with **Braille** and **ANSI Color** render engines.
- Implement UI Themes (Matrix Green, Retro Amber, Default).
- Add frictionless "Copy for Discord", "Copy as ANSI", "Copy as Markdown" buttons.
- Introduce keyboard shortcuts.

### Phase 2: Creative Expansion
- Introduce Text/Typography Generator (Figlet integration with custom retro fonts).
- Add GitHub/README and Discord-specific pre-made templates.
- Build the ASCII Playground (live "Figma for ASCII" editor).

### Phase 3: Viral & Community Mechanics
- ASCII Animation Generator (GIF export, scrolling matrix rain).
- Public Static Gallery (curated top artworks acting as SEO landing pages).
- PWA setup and full offline capabilities.
- Local IndexedDB history to save past creations.
