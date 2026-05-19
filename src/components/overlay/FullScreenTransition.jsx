import { motion } from "framer-motion";
import FitImage from "../common/FitImage.jsx";

export default function FullScreenTransition({ transition, event }) {
  if (!transition?.active) return null;

  return (
    <motion.div
      className="fullscreen-transition"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <FitImage src={event?.logoPath} alt={event?.title} className="transition-logo" />
      <div>
        <p>{event?.title}</p>
        <h1>{transition.title}</h1>
        <h2>{transition.subtitle}</h2>
      </div>
    </motion.div>
  );
}
