import SideCanvas from "../components/overlay/SideCanvas.jsx";
import { useOverlayData } from "../hooks/useOverlayData.js";

export default function OverlayLeft() {
  const state = useOverlayData();
  return <SideCanvas state={state} side="left" />;
}
