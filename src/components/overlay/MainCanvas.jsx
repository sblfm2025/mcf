import { AnimatePresence, motion } from "framer-motion";
import FitImage from "../common/FitImage.jsx";
import FullScreenTransition from "./FullScreenTransition.jsx";
import RunningText from "./RunningText.jsx";
import SponsorStrip from "./SponsorStrip.jsx";
import { formatNameLines, nameSizeClass } from "../../lib/typography.js";

export default function MainCanvas({ state }) {
  const { event, speaker, performer, runningText, sponsor, mediaPartner, schedule, transition, activeScene } = state;
  const showSpeaker = speaker.active && activeScene === "sambutan";
  const showPerformer = performer.active && activeScene === "penampil";
  const stageKey = transition.active ? "transition" : showSpeaker ? "speaker" : showPerformer ? "performer" : "next";
  const stageMotion = {
    initial: { opacity: 0, y: 34, scale: 0.985, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -22, scale: 0.99, filter: "blur(8px)" },
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <main className={`overlay-screen overlay-main mode-${event.designMode || "elegant-international"}`} style={{ "--bg-image": `url("${event.backgroundPath}")` }}>
      <div className="broadcast-bg" />
      <header className="overlay-header">
        <FitImage src={event.logoPath} alt={event.title} />
        <div>
          <p>{event.venue}</p>
          <h1>{event.title}</h1>
        </div>
        <FitImage src={event.kenLogoPath} alt="KEN" />
      </header>

      <section className="main-stage">
        <AnimatePresence mode="wait">
          {showSpeaker && (
            <motion.article key={stageKey} className="lower-third speaker-card light-sweep scene-enter" {...stageMotion}>
              <div className="speaker-photo">
                <FitImage src={speaker.photoPath} alt={speaker.name} mode="cover" />
              </div>
              <div className="speaker-copy">
                <div className="segment-label">SAMBUTAN</div>
                <h2 className={nameSizeClass(speaker.name)}>
                  {formatNameLines(speaker.name, 2).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
                <h3>{speaker.title}</h3>
                <p>{speaker.subtitle}</p>
              </div>
            </motion.article>
          )}

          {showPerformer && (
            <motion.article key={stageKey} className="lower-third performer-card light-sweep scene-enter" {...stageMotion}>
              <div className="performer-visual">
                <FitImage src={performer.photoPath || performer.logoPath} alt={performer.performerName} />
              </div>
              <div className="performer-copy">
                <div className="segment-label">{performer.category}</div>
                <h2 className={nameSizeClass(performer.performerName)}>
                  {formatNameLines(performer.performerName, 2).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
                <h3>{performer.groupName}</h3>
              </div>
              <div className="performer-logo-mark">
                <FitImage src={performer.logoPath} alt={performer.groupName} />
              </div>
            </motion.article>
          )}

          {!showSpeaker && !showPerformer && (
            <motion.article key={stageKey} className="next-event light-sweep" {...stageMotion}>
              <span>Berikutnya</span>
              <h2>{schedule.next}</h2>
              <p>{schedule.current}</p>
            </motion.article>
          )}
        </AnimatePresence>
      </section>

      <SponsorStrip sponsor={sponsor} />
      <SponsorStrip
        className="media-partner-strip"
        sponsor={{
          active: mediaPartner?.active,
          mode: "Media Partner",
          interval: mediaPartner?.interval,
          sponsors: mediaPartner?.partners || [],
        }}
      />
      <RunningText runningText={runningText} />
      <FullScreenTransition transition={transition} event={event} />
    </main>
  );
}
