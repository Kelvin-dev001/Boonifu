type Props = { imageUrl: string };

export default function PosterPreview({ imageUrl }: Props) {
  return (
    <div className="mt-6 relative w-full flex justify-center">
      {/* Poster Image */}
      <img
        src={imageUrl}
        alt="Poster preview"
        className="rounded shadow w-full max-w-xs"
        style={{ filter: "grayscale(0.1)" }}
      />
      {/* Watermark overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="text-3xl font-bold text-white opacity-60"
          style={{
            textShadow: "2px 2px 8px #000,0 0 8px #000",
            transform: "rotate(-20deg)",
          }}
        >
          Boonifu Preview
        </span>
      </div>
    </div>
  );
}