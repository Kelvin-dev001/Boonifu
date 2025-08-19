"use client";
import { palettes } from "@/lib/colors";
import { posterTemplates } from "@/lib/templates";

type Poster = {
  headline: string;
  subheadline: string;
  cta: string;
  footer: string;
  style: string;
  palette: string;
  logo: File | null;
};

type PosterPreviewProps = {
  poster: Poster;
};

export default function PosterPreview({ poster }: PosterPreviewProps) {
  const palette = palettes.find((p) => p.id === poster.palette) || palettes[0];
  const template = posterTemplates.find((t) => t.id === poster.style) || posterTemplates[0];

  // Logo image preview
  const logoUrl = poster.logo ? URL.createObjectURL(poster.logo) : null;

  return (
    <section
      className="w-full max-w-xs aspect-[3/4] relative bg-white rounded shadow-lg overflow-hidden flex flex-col items-center justify-center"
      style={{ background: palette.colors.bg }}
    >
      {logoUrl && <img src={logoUrl} alt="Logo" className="absolute top-2 left-2 w-12 h-12 rounded object-contain z-10" />}
      <div className="p-4 w-full h-full flex flex-col justify-between">
        <div>
          <h1 className="font-bold text-xl mb-2" style={{ color: palette.colors.headline }}>
            {poster.headline || "Your Headline"}
          </h1>
          <h2 className="text-md mb-4" style={{ color: palette.colors.subheadline }}>
            {poster.subheadline || "Your Subheadline"}
          </h2>
        </div>
        <div>
          <button className="w-full py-2 rounded font-bold text-white" style={{ background: palette.colors.cta }}>
            {poster.cta || "Your CTA"}
          </button>
          <div className="mt-2 text-xs text-right" style={{ color: palette.colors.footer }}>
            {poster.footer || "Your Footer"}
          </div>
        </div>
      </div>
      {/* Watermark for MVP */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-400 z-20 bg-white/50 px-2 py-1 rounded">
        Boonifu MVP
      </div>
    </section>
  );
}