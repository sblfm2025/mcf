import { useEffect, useState } from "react";
import { defaultOverlayState } from "../lib/overlayDefaults.js";
import { subscribeOverlayState } from "../lib/stateStore.js";

export function useOverlayData() {
  const [state, setState] = useState(defaultOverlayState);

  useEffect(() => subscribeOverlayState(setState), []);

  return state;
}
