import { useState } from "react";

export default function FitImage({ src, alt = "", mode = "contain", className = "" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={`${mode === "cover" ? "photo-fit" : "logo-fit"} ${className}`}
      draggable="false"
      onError={() => setFailed(true)}
    />
  );
}
