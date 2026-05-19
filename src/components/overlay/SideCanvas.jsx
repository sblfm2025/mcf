import FitImage from "../common/FitImage.jsx";
import RunningText from "./RunningText.jsx";
import SponsorStrip from "./SponsorStrip.jsx";
import { formatNameLines, nameSizeClass } from "../../lib/typography.js";

export default function SideCanvas({ state, side = "left" }) {
  const { event, speaker, performer, schedule, sponsor, mediaPartner, runningText } = state;
  const isLeft = side === "left";

  return (
    <main className={`overlay-screen overlay-side mode-${event.designMode || "elegant-international"}`} style={{ "--bg-image": `url("${event.backgroundPath}")` }}>
      <div className="broadcast-bg" />
      <header className="side-header">
        <FitImage src={event.logoPath} alt={event.title} />
        <p>{event.date}</p>
      </header>

      <section className="side-stage">
        {isLeft ? (
          <>
            <div className="side-photo elegant-photo">
              <FitImage src={speaker.photoPath || event.mascotPath} alt={speaker.name} mode="cover" />
            </div>
            <div className="side-title">
              <span>SAMBUTAN</span>
              <h1 className={nameSizeClass(speaker.name)}>
                {formatNameLines(speaker.name, 2).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p>{speaker.title}</p>
            </div>
          </>
        ) : (
          <>
            <div className="side-photo clean light-sweep">
              <FitImage src={performer.logoPath || event.mascotPath} alt={performer.performerName} />
            </div>
            <div className="side-title">
              <span>{performer.category}</span>
              <h1 className={nameSizeClass(performer.performerName)}>
                {formatNameLines(performer.performerName, 2).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p>{performer.groupName}</p>
            </div>
            <div className="side-next">
              <small>Berikutnya</small>
              <strong>{schedule.next}</strong>
            </div>
          </>
        )}
      </section>

      <SponsorStrip
        sponsor={
          side === "right" && mediaPartner?.active
            ? { active: true, mode: "Media Partner", interval: mediaPartner.interval, sponsors: mediaPartner.partners || [] }
            : sponsor
        }
      />
      <RunningText runningText={{ ...runningText, text: isLeft ? event.title : runningText.text }} />
    </main>
  );
}
