"use client";
import { useRef } from "react";
import * as fabric from "fabric";

type ExportPosterProps = {
  poster: {
    headline: string;
    subheadline: string;
    cta: string;
    footer: string;
    style: string;
    palette: string;
    logo: File | null;
  };
};

export default function ExportPoster({ poster }: ExportPosterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleExport() {
    // Create a Fabric canvas and draw the poster
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 800,
      backgroundColor: "#fff",
    });

    // Draw headline, subheadline, etc. (simplified for MVP)
    canvas.add(new fabric.Text(poster.headline || "Your Headline", {
      left: 50,
      top: 80,
      fontSize: 40,
      fill: "#222",
      fontWeight: "bold",
    }));

    canvas.add(new fabric.Text(poster.subheadline || "Your Subheadline", {
      left: 50,
      top: 140,
      fontSize: 24,
      fill: "#444",
    }));

    canvas.add(new fabric.Text(poster.cta || "Your CTA", {
      left: 50,
      top: 600,
      fontSize: 32,
      fill: "#E65C30",
      fontWeight: "bold",
      backgroundColor: "#fff",
    }));

    canvas.add(new fabric.Text(poster.footer || "Your Footer", {
      left: 50,
      top: 750,
      fontSize: 18,
      fill: "#555",
    }));

    // Watermark
    canvas.add(new fabric.Text("Boonifu MVP", {
      left: 400,
      top: 780,
      fontSize: 16,
      fill: "gray",
      opacity: 0.5,
    }));

    // Optionally add logo
    if (poster.logo) {
      const reader = new FileReader();
      reader.onload = function (e) {
        fabric.Image.fromURL(e.target!.result as string, (img) => {
          img.set({ left: 500, top: 20, scaleX: 0.2, scaleY: 0.2 });
          canvas.add(img);
          exportImage(canvas);
        });
      };
      reader.readAsDataURL(poster.logo);
    } else {
      exportImage(canvas);
    }
  }

  function exportImage(canvas: fabric.Canvas) {
    const dataURL = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "boonifu-poster.png";
    link.click();
    canvas.dispose();
  }

  return (
    <div className="mt-4 flex flex-col items-center">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button
        className="bg-boonifu-gold text-white px-4 py-2 rounded-lg font-bold"
        onClick={handleExport}
      >
        Export Poster (PNG)
      </button>
      <div className="text-xs mt-2 text-gray-400">Export is watermarked in MVP.</div>
    </div>
  );
}