import { AnimatePresence, motion } from "framer-motion";
import FitImage from "../common/FitImage.jsx";
import RunningText from "./RunningText.jsx";
import SponsorStrip from "./SponsorStrip.jsx";
import { formatNameLines, nameSizeClass } from "../../lib/typography.js";

export default function SideCanvas({ state, side = "left" }) {
  const { event, speaker, performer, schedule, sponsor, mediaPartner, runningText } = state;
  const isLeft = side === "left";
  const sideMotion = {
    initial: { opacity: 0, y: 22, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -18, filter: "blur(8px)" },
    transition: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <main className={`overlay-screen overlay-side mode-${event.designMode || "elegant-international"}`} style={{ "--bg-image": `url("${event.backgroundPath}")` }}>
      <div className="broadcast-bg" />
      <header className="side-header">
        <FitImage src={event.logoPath} alt={event.title} />
        <p>{event.date}</p>
      </header>

      <section className="side-stage">
        <AnimatePresence mode="wait">
          {isLeft ? (
          <motion.div key="left-speaker" className="side-stack" {...sideMotion}>
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
          </motion.div>
        ) : (
          <motion.div key="right-performer" className="side-stack" {...sideMotion}>
            <div className="side-photo clean performer-side-photo light-sweep">
              <FitImage src={performer.photoPath || performer.logoPath || event.mascotPath} alt={performer.performerName} />
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
          </motion.div>
        )}
        </AnimatePresence>
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
