import MainCanvas from "../components/overlay/MainCanvas.jsx";
import TestPattern from "../components/overlay/TestPattern.jsx";
import { useOverlayData } from "../hooks/useOverlayData.js";

export default function OverlayMain() {
  const state = useOverlayData();

  if (new URLSearchParams(window.location.search).get("testPattern") === "1") {
    return <TestPattern label="MAIN 6:4" />;
  }

  return <MainCanvas state={state} />;
}
