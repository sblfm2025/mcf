import { motion } from "framer-motion";
import FitImage from "../common/FitImage.jsx";

export default function FullScreenTransition({ transition, event }) {
  if (!transition?.active) return null;

  return (
    <motion.div
      className="fullscreen-transition light-sweep"
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18, duration: 0.5 }}>
        <FitImage src={event?.logoPath} alt={event?.title} className="transition-logo" />
        <p>{event?.title}</p>
        <h1>{transition.title}</h1>
        <h2>{transition.subtitle}</h2>
      </motion.div>
    </motion.div>
  );
}
