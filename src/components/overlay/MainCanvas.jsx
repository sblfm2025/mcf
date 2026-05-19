import { motion } from "framer-motion";
import FitImage from "../common/FitImage.jsx";
import FullScreenTransition from "./FullScreenTransition.jsx";
import RunningText from "./RunningText.jsx";
import SponsorStrip from "./SponsorStrip.jsx";
import { formatNameLines, nameSizeClass } from "../../lib/typography.js";

export default function MainCanvas({ state }) {
  const { event, speaker, performer, runningText, sponsor, mediaPartner, schedule, transition, activeScene } = state;
  const showSpeaker = speaker.active && activeScene === "sambutan";
  const showPerformer = performer.active && activeScene === "penampil";

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
        {showSpeaker && (
          <motion.article className="lower-third speaker-card light-sweep" initial={{ y: 42, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
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
          <motion.article className="lower-third performer-card light-sweep" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <FitImage src={performer.logoPath} alt={performer.groupName} />
            <div>
              <div className="segment-label">{performer.category}</div>
              <h2 className={nameSizeClass(performer.performerName)}>
                {formatNameLines(performer.performerName, 2).map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <h3>{performer.groupName}</h3>
            </div>
          </motion.article>
        )}

        {!showSpeaker && !showPerformer && (
          <article className="next-event">
            <span>Berikutnya</span>
            <h2>{schedule.next}</h2>
            <p>{schedule.current}</p>
          </article>
        )}
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
