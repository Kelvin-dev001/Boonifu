"use client";
import Controls from "@/components/Controls";
import PosterPreview from "@/components/PosterPreview";
import ExportPoster from "@/components/ExportPoster";
import { useState } from "react";

export default function GeneratePage() {
  const [poster, setPoster] = useState({
    headline: "",
    subheadline: "",
    cta: "",
    footer: "",
    style: "classic",
    palette: "modern",
    logo: null,
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-4">
      <h1 className="text-2xl font-bold mb-2 text-center">Create Your Poster</h1>
      <Controls poster={poster} setPoster={setPoster} />
      <PosterPreview poster={poster} />
      <ExportPoster poster={poster} />
      <div className="mt-6 text-sm text-gray-500 text-center">
        <span>Preview is watermarked. HD export after payment.</span>
      </div>
    </main>
  );
}