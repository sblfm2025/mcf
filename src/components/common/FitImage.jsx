export default function FitImage({ src, alt = "", mode = "contain", className = "" }) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={`${mode === "cover" ? "photo-fit" : "logo-fit"} ${className}`}
      draggable="false"
    />
  );
}
