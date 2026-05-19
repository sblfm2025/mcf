import { useEffect, useState } from "react";
import { Activity, Eye, MonitorPlay, RadioTower, RotateCcw, Save, ShieldCheck, UploadCloud } from "lucide-react";
import AuthGate from "../components/control/AuthGate.jsx";
import AssetPicker from "../components/control/AssetPicker.jsx";
import TextInput from "../components/control/TextInput.jsx";
import SegmentButton from "../components/common/SegmentButton.jsx";
import { flatAssets } from "../lib/assetManifest.js";
import { firebaseEnabled } from "../lib/firebase.js";
import { defaultOverlayState, scenePresets } from "../lib/overlayDefaults.js";
import { deepMerge, saveOverlayState } from "../lib/stateStore.js";
import { useOverlayData } from "../hooks/useOverlayData.js";

const tabs = [
  "Live Control",
  "Sambutan",
  "Penampil",
  "Running Text",
  "Jadwal Acara",
  "Full Screen",
  "Sponsor",
  "Media Partner",
  "Asset Manager",
  "Scene Preset",
  "Tampilan",
];

export default function ControlPanel() {
  return (
    <AuthGate>
      <ControlPanelContent />
    </AuthGate>
  );
}

function ControlPanelContent() {
  const liveState = useOverlayData();
  const [draft, setDraft] = useState(liveState);
  const [activeTab, setActiveTab] = useState("Live Control");
  const [status, setStatus] = useState("Siap");

  useEffect(() => setDraft(liveState), [liveState]);

  function patch(path, value) {
    setDraft((current) => {
      const next = structuredClone(current);
      let cursor = next;
      path.slice(0, -1).forEach((key) => {
        cursor[key] = cursor[key] || {};
        cursor = cursor[key];
      });
      cursor[path[path.length - 1]] = value;
      return next;
    });
  }

  async function save(nextState = draft) {
    const result = await saveOverlayState(nextState);
    setStatus(result.ok && result.mode === "firebase" ? "Tersimpan ke Firebase" : "Tersimpan lokal");
    if (!result.ok) {
      setStatus("Firestore ditolak, fallback lokal aktif");
    }
    window.setTimeout(() => setStatus("Siap"), 2200);
  }

  async function applyPreset(preset) {
    const next = deepMerge(draft, preset.patch);
    setDraft(next);
    await save(next);
  }

  async function resetDefaults() {
    setDraft(defaultOverlayState);
    await save(defaultOverlayState);
  }

  async function seedLiveState() {
    const result = await saveOverlayState(defaultOverlayState);
    setDraft(defaultOverlayState);
    setStatus(result.ok && result.mode === "firebase" ? "Live state dibuat" : "Seed tersimpan lokal");
    if (!result.ok) {
      setStatus("Seed lokal aktif, cek rules Firebase");
    }
    window.setTimeout(() => setStatus("Siap"), 2600);
  }

  function updateScheduleItem(index, key, value) {
    const items = [...draft.schedule.items];
    items[index] = { ...items[index], [key]: value };
    patch(["schedule", "items"], items);
  }

  function addScheduleItem() {
    patch(["schedule", "items"], [...draft.schedule.items, { time: "21.00", title: "Segmen Baru" }]);
  }

  function removeScheduleItem(index) {
    patch(
      ["schedule", "items"],
      draft.schedule.items.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function updateSponsorItem(index, key, value) {
    const sponsors = [...draft.sponsor.sponsors];
    sponsors[index] = { ...sponsors[index], [key]: value };
    patch(["sponsor", "sponsors"], sponsors);
  }

  function addSponsorItem() {
    patch(
      ["sponsor", "sponsors"],
      [...draft.sponsor.sponsors, { name: "Sponsor Baru", logoPath: "/aset/logo/event/logo-mcf-ken.png", tier: "sponsor" }],
    );
  }

  function removeSponsorItem(index) {
    patch(
      ["sponsor", "sponsors"],
      draft.sponsor.sponsors.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function updateMediaPartnerItem(index, key, value) {
    const partners = [...(draft.mediaPartner?.partners || [])];
    partners[index] = { ...partners[index], [key]: value };
    patch(["mediaPartner", "partners"], partners);
  }

  function addMediaPartnerItem() {
    patch(
      ["mediaPartner", "partners"],
      [
        ...(draft.mediaPartner?.partners || []),
        { name: "Media Partner Baru", logoPath: "/aset/logo/ken/logo-ken.png", tier: "media-partner" },
      ],
    );
  }

  function formatLastUpdate(value) {
    if (!value) return "Belum ada";
    const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
    if (Number.isNaN(date.getTime())) return "Belum ada";
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <main className="workspace control-page">
      <div className="topbar">
        <div className="page-heading">
          <p>Control Panel Event</p>
          <h1>Operator Broadcast</h1>
        </div>
        <div className="status-pill">
          <ShieldCheck size={16} />
          {firebaseEnabled ? "Firebase aktif" : "Local fallback"}
        </div>
      </div>

      <div className="control-layout">
        <nav className="tab-list">
          {tabs.map((tab) => (
            <SegmentButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </SegmentButton>
          ))}
        </nav>

        <section className="panel-surface">
          {activeTab === "Live Control" && (
            <div className="control-room">
              <div className="live-preview-panel">
                <iframe title="Live main preview" src="/overlay/main" />
              </div>
              <div className="quick-panel">
                <div className="control-metric">
                  <Activity size={18} />
                  <span>Active Scene</span>
                  <strong>{draft.activeScene}</strong>
                </div>
                <div className="control-metric">
                  <RadioTower size={18} />
                  <span>Firebase</span>
                  <strong>{firebaseEnabled ? "Online" : "Local"}</strong>
                </div>
                <div className="control-metric">
                  <ShieldCheck size={18} />
                  <span>Last Update</span>
                  <strong>{formatLastUpdate(draft.meta?.updatedAt)}</strong>
                </div>
                <div className="preset-grid compact">
                  {scenePresets.map((preset) => (
                    <button type="button" key={preset.id} onClick={() => applyPreset(preset)}>
                      {preset.label.replace("Preset ", "")}
                    </button>
                  ))}
                </div>
              </div>
              <div className="dashboard-grid">
                <a href="/overlay/main" target="_blank" rel="noreferrer" className="launch-tile">
                  <MonitorPlay size={22} />
                  <strong>Main 6:4</strong>
                  <span>/overlay/main</span>
                </a>
                <a href="/overlay/left" target="_blank" rel="noreferrer" className="launch-tile">
                  <MonitorPlay size={22} />
                  <strong>Left 2:3</strong>
                  <span>/overlay/left</span>
                </a>
                <a href="/overlay/right" target="_blank" rel="noreferrer" className="launch-tile">
                  <MonitorPlay size={22} />
                  <strong>Right 2:3</strong>
                  <span>/overlay/right</span>
                </a>
                <a href="/preview" target="_blank" rel="noreferrer" className="launch-tile">
                  <Eye size={22} />
                  <strong>Preview</strong>
                  <span>Semua layar</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === "Sambutan" && (
            <div className="form-grid">
              <Toggle label="Aktif" checked={draft.speaker.active} onChange={(value) => patch(["speaker", "active"], value)} />
              <TextInput label="Nama" value={draft.speaker.name} onChange={(value) => patch(["speaker", "name"], value)} />
              <TextInput label="Jabatan" value={draft.speaker.title} onChange={(value) => patch(["speaker", "title"], value)} />
              <TextInput label="Subjudul" value={draft.speaker.subtitle} onChange={(value) => patch(["speaker", "subtitle"], value)} />
              <AssetPicker label="Pilih Foto Sambutan" category="mascots" value={draft.speaker.photoPath} onChange={(value) => patch(["speaker", "photoPath"], value)} />
            </div>
          )}

          {activeTab === "Penampil" && (
            <div className="form-grid">
              <Toggle label="Aktif" checked={draft.performer.active} onChange={(value) => patch(["performer", "active"], value)} />
              <TextInput label="Nama Penampil" value={draft.performer.performerName} onChange={(value) => patch(["performer", "performerName"], value)} />
              <TextInput label="Sanggar/Komunitas" value={draft.performer.groupName} onChange={(value) => patch(["performer", "groupName"], value)} />
              <TextInput label="Kategori" value={draft.performer.category} onChange={(value) => patch(["performer", "category"], value)} />
              <AssetPicker label="Pilih Logo Penampil" category="eventLogos" value={draft.performer.logoPath} onChange={(value) => patch(["performer", "logoPath"], value)} />
              <AssetPicker label="Pilih Foto Penampil" category="mascots" value={draft.performer.photoPath} onChange={(value) => patch(["performer", "photoPath"], value)} />
            </div>
          )}

          {activeTab === "Running Text" && (
            <div className="form-grid">
              <Toggle label="Aktif" checked={draft.runningText.active} onChange={(value) => patch(["runningText", "active"], value)} />
              <TextInput label="Teks" multiline value={draft.runningText.text} onChange={(value) => patch(["runningText", "text"], value)} />
              <label className="field">
                <span>Kecepatan</span>
                <select value={draft.runningText.speed} onChange={(event) => patch(["runningText", "speed"], event.target.value)}>
                  <option value="slow">Slow</option>
                  <option value="normal">Normal</option>
                  <option value="fast">Fast</option>
                </select>
              </label>
            </div>
          )}

          {activeTab === "Jadwal Acara" && (
            <div className="form-grid">
              <Toggle label="Aktif" checked={draft.schedule.active} onChange={(value) => patch(["schedule", "active"], value)} />
              <TextInput label="Acara Berjalan" value={draft.schedule.current} onChange={(value) => patch(["schedule", "current"], value)} />
              <TextInput label="Acara Berikutnya" value={draft.schedule.next} onChange={(value) => patch(["schedule", "next"], value)} />
              <div className="editable-list">
                {draft.schedule.items.map((item, index) => (
                  <div className="list-row" key={`${item.time}-${index}`}>
                    <input value={item.time} onChange={(event) => updateScheduleItem(index, "time", event.target.value)} aria-label="Jam acara" />
                    <input value={item.title} onChange={(event) => updateScheduleItem(index, "title", event.target.value)} aria-label="Judul acara" />
                    <button type="button" onClick={() => removeScheduleItem(index)}>
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="secondary-action inline-action" onClick={addScheduleItem}>
                Tambah Jadwal
              </button>
            </div>
          )}

          {activeTab === "Full Screen" && (
            <div className="form-grid">
              <Toggle label="Aktif" checked={draft.transition.active} onChange={(value) => patch(["transition", "active"], value)} />
              <TextInput label="Judul" value={draft.transition.title} onChange={(value) => patch(["transition", "title"], value)} />
              <TextInput label="Subjudul" value={draft.transition.subtitle} onChange={(value) => patch(["transition", "subtitle"], value)} />
              <label className="field">
                <span>Durasi Detik</span>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={draft.transition.duration}
                  onChange={(event) => patch(["transition", "duration"], Number(event.target.value))}
                />
              </label>
              <label className="field">
                <span>Scene Aktif</span>
                <select value={draft.activeScene} onChange={(event) => patch(["activeScene"], event.target.value)}>
                  <option value="sambutan">Sambutan</option>
                  <option value="penampil">Penampil</option>
                  <option value="sponsor">Sponsor Moment</option>
                  <option value="next">Next Event</option>
                  <option value="closing">Closing</option>
                </select>
              </label>
            </div>
          )}

          {activeTab === "Sponsor" && (
            <div className="form-grid">
              <Toggle label="Aktif" checked={draft.sponsor.active} onChange={(value) => patch(["sponsor", "active"], value)} />
              <TextInput label="Mode" value={draft.sponsor.mode} onChange={(value) => patch(["sponsor", "mode"], value)} />
              <label className="field">
                <span>Interval Rotator</span>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={draft.sponsor.interval}
                  onChange={(event) => patch(["sponsor", "interval"], Number(event.target.value))}
                />
              </label>
              <div className="editable-list">
                {draft.sponsor.sponsors.map((sponsor, index) => (
                  <div className="sponsor-editor" key={`${sponsor.name}-${index}`}>
                    <TextInput label="Nama Sponsor" value={sponsor.name} onChange={(value) => updateSponsorItem(index, "name", value)} />
                    <AssetPicker
                      label="Pilih Logo Sponsor"
                      category="sponsorLogos"
                      value={sponsor.logoPath}
                      onChange={(value) => updateSponsorItem(index, "logoPath", value)}
                    />
                    <TextInput label="Path Logo Sponsor" value={sponsor.logoPath} onChange={(value) => updateSponsorItem(index, "logoPath", value)} />
                    <button type="button" className="secondary-action inline-action" onClick={() => removeSponsorItem(index)}>
                      Hapus Sponsor
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="secondary-action inline-action" onClick={addSponsorItem}>
                Tambah Sponsor
              </button>
            </div>
          )}

          {activeTab === "Media Partner" && (
            <div className="form-grid">
              <Toggle
                label="Aktif"
                checked={Boolean(draft.mediaPartner?.active)}
                onChange={(value) => patch(["mediaPartner", "active"], value)}
              />
              <div className="editable-list">
                {(draft.mediaPartner?.partners || []).map((partner, index) => (
                  <div className="sponsor-editor" key={`${partner.name}-${index}`}>
                    <TextInput label="Nama Media Partner" value={partner.name} onChange={(value) => updateMediaPartnerItem(index, "name", value)} />
                    <AssetPicker
                      label="Pilih Logo Media Partner"
                      category="sponsorLogos"
                      value={partner.logoPath}
                      onChange={(value) => updateMediaPartnerItem(index, "logoPath", value)}
                    />
                    <TextInput
                      label="Path Logo Media Partner"
                      value={partner.logoPath}
                      onChange={(value) => updateMediaPartnerItem(index, "logoPath", value)}
                    />
                  </div>
                ))}
              </div>
              <button type="button" className="secondary-action inline-action" onClick={addMediaPartnerItem}>
                Tambah Media Partner
              </button>
            </div>
          )}

          {activeTab === "Asset Manager" && (
            <div className="asset-library">
              {flatAssets.map((asset) => (
                <article key={asset.path} className="asset-card">
                  <img src={asset.path} alt={asset.name} />
                  <div>
                    <strong>{asset.name}</strong>
                    <span>{asset.category}</span>
                    <code>{asset.path}</code>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "Scene Preset" && (
            <div className="preset-grid">
              {scenePresets.map((preset) => (
                <button type="button" key={preset.id} onClick={() => applyPreset(preset)}>
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {activeTab === "Tampilan" && (
            <div className="form-grid">
              <TextInput label="Judul Event" value={draft.event.title} onChange={(value) => patch(["event", "title"], value)} />
              <TextInput label="Venue" value={draft.event.venue} onChange={(value) => patch(["event", "venue"], value)} />
              <TextInput label="Tanggal" value={draft.event.date} onChange={(value) => patch(["event", "date"], value)} />
              <label className="field">
                <span>Mode Desain</span>
                <select value={draft.event.designMode || "elegant-international"} onChange={(event) => patch(["event", "designMode"], event.target.value)}>
                  <option value="elegant-international">Elegant International</option>
                  <option value="cultural-premium">Cultural Premium</option>
                  <option value="minimal-broadcast">Minimal Broadcast</option>
                  <option value="festival-dynamic">Festival Dynamic</option>
                </select>
              </label>
              <AssetPicker label="Pilih Background" category="backgrounds" value={draft.event.backgroundPath} onChange={(value) => patch(["event", "backgroundPath"], value)} />
              <AssetPicker label="Pilih Logo Event" category="eventLogos" value={draft.event.logoPath} onChange={(value) => patch(["event", "logoPath"], value)} />
              <AssetPicker label="Pilih Maskot" category="mascots" value={draft.event.mascotPath} onChange={(value) => patch(["event", "mascotPath"], value)} />
            </div>
          )}
        </section>

        <aside className="operator-actions">
          <button type="button" className="primary-action" onClick={() => save()}>
            <Save size={18} />
            Simpan
          </button>
          <button type="button" className="secondary-action" onClick={resetDefaults}>
            <RotateCcw size={18} />
            Reset
          </button>
          <button type="button" className="secondary-action" onClick={seedLiveState}>
            <UploadCloud size={18} />
            Seed Live
          </button>
          <p>{status}</p>
        </aside>
      </div>
    </main>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="toggle-field">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}
