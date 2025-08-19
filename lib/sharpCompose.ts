import sharp from "sharp";
import fetch from "node-fetch";

export async function composePoster({ backgroundUrl, headline, subhead, cta, footer, logoUrl, preview }) {
  // Download background and logo
  const bgBuffer = await (await fetch(backgroundUrl)).buffer();
  const logoBuffer = logoUrl ? await (await fetch(logoUrl)).buffer() : null;

  // Create 2160×2700 print-ready poster
  let poster = sharp(bgBuffer).resize(2160, 2700);

  // Add text overlays (headline, subhead, CTA, footer)
  // Use SVG for crisp, vector-quality text
  const textSvg = `
    <svg width="2160" height="2700">
      <text x="100" y="300" font-size="120" fill="#222" font-family="Arial" letter-spacing="2">${headline}</text>
      <text x="100" y="500" font-size="72" fill="#444" font-family="Arial" letter-spacing="1">${subhead}</text>
      <text x="100" y="2400" font-size="100" fill="#E65C30" font-family="Arial" font-weight="bold">${cta}</text>
      <text x="100" y="2650" font-size="48" fill="#555" font-family="Arial">${footer}</text>
      ${preview ? '<text x="1800" y="2680" font-size="36" fill="gray" opacity="0.4">Boonifu Preview</text>' : ""}
    </svg>
  `;
  poster = poster.composite([{ input: Buffer.from(textSvg), top: 0, left: 0 }]);

  // Add logo if provided
  if (logoBuffer) {
    poster = poster.composite([
      { input: logoBuffer, top: 2000, left: 1800, blend: "over" }, // safe area, auto-fit: adjust as needed
    ]);
  }

  // Output print and social sizes
  const printBuffer = await poster.png().toBuffer();
  const socialBuffer = await sharp(printBuffer).resize(1080, 1350).png().toBuffer();

  return { printBuffer, socialBuffer };
}