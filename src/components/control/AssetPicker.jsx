import { ImageIcon } from "lucide-react";
import { assetManifest } from "../../lib/assetManifest.js";

export default function AssetPicker({ label, value, category = "backgrounds", onChange }) {
  const assets = assetManifest[category] || [];

  return (
    <label className="field">
      <span>{label}</span>
      <div className="asset-picker">
        {assets.map((asset) => (
          <button
            type="button"
            key={asset.path}
            className={`asset-option ${value === asset.path ? "is-selected" : ""}`}
            onClick={() => onChange(asset.path)}
            title={asset.name}
          >
            <img src={asset.path} alt={asset.name} />
          </button>
        ))}
        {!assets.length && (
          <div className="empty-assets">
            <ImageIcon size={18} />
            Aset belum tersedia
          </div>
        )}
      </div>
    </label>
  );
}
