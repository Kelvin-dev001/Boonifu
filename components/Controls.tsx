"use client";
import { posterTemplates } from "@/lib/templates";
import { palettes } from "@/lib/colors";

type Poster = {
  headline: string;
  subheadline: string;
  cta: string;
  footer: string;
  style: string;
  palette: string;
  logo: File | null;
};

type ControlsProps = {
  poster: Poster;
  setPoster: (poster: Poster) => void;
};

export default function Controls({ poster, setPoster }: ControlsProps) {
  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setPoster({ ...poster, [name]: value });
  }

  function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    setPoster({ ...poster, logo: e.target.files?.[0] || null });
  }

  return (
    <section className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mb-4">
      <label className="block mb-2 font-semibold">Headline</label>
      <input
        className="w-full mb-3 p-2 border rounded"
        name="headline"
        value={poster.headline}
        onChange={handleChange}
        placeholder="Enter headline..."
      />

      <label className="block mb-2 font-semibold">Subheadline</label>
      <input
        className="w-full mb-3 p-2 border rounded"
        name="subheadline"
        value={poster.subheadline}
        onChange={handleChange}
        placeholder="Enter subheadline..."
      />

      <label className="block mb-2 font-semibold">Call to Action</label>
      <input
        className="w-full mb-3 p-2 border rounded"
        name="cta"
        value={poster.cta}
        onChange={handleChange}
        placeholder="Enter CTA..."
      />

      <label className="block mb-2 font-semibold">Footer</label>
      <input
        className="w-full mb-3 p-2 border rounded"
        name="footer"
        value={poster.footer}
        onChange={handleChange}
        placeholder="Enter footer..."
      />

      <label className="block mb-2 font-semibold">Template Style</label>
      <div className="flex gap-2 overflow-x-auto mb-3">
        {posterTemplates.map((tpl) => (
          <button
            key={tpl.id}
            className={`border rounded p-2 min-w-[80px] ${poster.style === tpl.id ? "border-boonifu-gold" : "border-gray-300"} flex flex-col items-center`}
            type="button"
            onClick={() => setPoster({ ...poster, style: tpl.id })}
          >
            {tpl.previewImg && <img src={tpl.previewImg} alt={tpl.name} className="w-10 h-10 object-cover rounded mb-1" />}
            <span className="text-xs">{tpl.name}</span>
          </button>
        ))}
      </div>

      <label className="block mb-2 font-semibold">Color Palette</label>
      <div className="flex gap-2 overflow-x-auto mb-3">
        {palettes.map((pl) => (
          <button
            key={pl.id}
            className={`rounded-full border-2 w-8 h-8 flex items-center justify-center ${poster.palette === pl.id ? "border-boonifu-gold" : "border-gray-300"}`}
            style={{ background: pl.previewBg }}
            type="button"
            onClick={() => setPoster({ ...poster, palette: pl.id })}
            aria-label={pl.name}
          />
        ))}
      </div>

      <label className="block mb-2 font-semibold">Logo (optional)</label>
      <input
        type="file"
        accept="image/*"
        className="w-full mb-3"
        onChange={handleLogo}
      />
    </section>
  );
}