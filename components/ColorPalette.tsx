export default function ColorPalette({ palettes, selected, onSelect }) {
  return (
    <div>
      <label className="block font-semibold mb-1">Color Palette</label>
      <div className="flex gap-2">
        {Object.entries(palettes).map(([key, palette]) => (
          <button
            key={key}
            type="button"
            className={`rounded-full w-8 h-8 border-2 ${selected === key ? "border-black" : "border-gray-300"}`}
            style={{ background: palette.bg }}
            onClick={() => onSelect(key)}
            aria-label={key}
          />
        ))}
      </div>
    </div>
  );
}