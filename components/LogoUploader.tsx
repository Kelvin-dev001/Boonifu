export default function LogoUploader({ logo, setLogo }) {
  return (
    <div>
      <label className="block font-semibold mb-1">Logo (optional)</label>
      <input
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file && file.size < 2 * 1024 * 1024) {
            setLogo(file);
          } else {
            alert("Logo must be image and <2MB");
          }
        }}
      />
      {logo && <span className="text-xs text-gray-500">Selected: {logo.name}</span>}
    </div>
  );
}