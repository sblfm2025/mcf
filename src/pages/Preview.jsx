import { useMemo, useState } from "react";
import { Copy, ExternalLink, RefreshCw, TestTube2 } from "lucide-react";
import { firebaseEnabled } from "../lib/firebase.js";

const screens = [
  { id: "main", label: "Main 6:4", path: "/overlay/main", frame: "main-frame" },
  { id: "left", label: "Left 2:3", path: "/overlay/left", frame: "side-frame" },
  { id: "right", label: "Right 2:3", path: "/overlay/right", frame: "side-frame" },
];

export default function Preview() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [testPattern, setTestPattern] = useState(false);
  const origin = window.location.origin;
  const resolvedScreens = useMemo(
    () =>
      screens.map((screen) => ({
        ...screen,
        src: `${screen.path}${testPattern ? "?testPattern=1" : ""}`,
        url: `${origin}${screen.path}`,
      })),
    [origin, testPattern],
  );

  async function copyUrl(url) {
    await navigator.clipboard.writeText(url);
  }

  return (
    <main className="workspace">
      <div className="topbar">
        <div className="page-heading">
          <p>Preview OBS</p>
          <h1>Control room view</h1>
        </div>
        <div className="preview-toolbar">
          <span className="status-pill">{firebaseEnabled ? "Firebase online" : "Local fallback"}</span>
          <button type="button" onClick={() => setTestPattern((current) => !current)}>
            <TestTube2 size={16} />
            Test Pattern
          </button>
          <button type="button" onClick={() => setRefreshKey((current) => current + 1)}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>
      <div className="preview-grid">
        {resolvedScreens.map((screen) => (
          <section key={screen.id}>
            <div className="preview-card-head">
              <span>{screen.label}</span>
              <div>
                <button type="button" title="Copy URL" onClick={() => copyUrl(screen.url)}>
                  <Copy size={15} />
                </button>
                <a title="Open OBS link" href={screen.url} target="_blank" rel="noreferrer">
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
            <div className={`preview-frame ${screen.frame}`}>
              <iframe key={`${screen.id}-${refreshKey}-${testPattern}`} title={`Preview ${screen.id}`} src={screen.src} />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
