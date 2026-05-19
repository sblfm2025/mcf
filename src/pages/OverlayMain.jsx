import MainCanvas from "../components/overlay/MainCanvas.jsx";
import { useOverlayData } from "../hooks/useOverlayData.js";

export default function OverlayMain() {
  const state = useOverlayData();
  return <MainCanvas state={state} />;
}
