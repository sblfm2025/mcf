import SideCanvas from "../components/overlay/SideCanvas.jsx";
import TestPattern from "../components/overlay/TestPattern.jsx";
import { useOverlayData } from "../hooks/useOverlayData.js";

export default function OverlayRight() {
  const state = useOverlayData();

  if (new URLSearchParams(window.location.search).get("testPattern") === "1") {
    return <TestPattern label="RIGHT 2:3" />;
  }

  return <SideCanvas state={state} side="right" />;
}
