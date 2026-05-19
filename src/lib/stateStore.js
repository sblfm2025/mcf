import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase.js";
import { defaultOverlayState, eventId } from "./overlayDefaults.js";

const storageKey = `overlay-state:${eventId}`;
const docPath = ["events", eventId, "overlays", "live"];

export function readLocalState() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? deepMerge(defaultOverlayState, JSON.parse(saved)) : defaultOverlayState;
  } catch {
    return defaultOverlayState;
  }
}

export function writeLocalState(nextState) {
  localStorage.setItem(storageKey, JSON.stringify(nextState));
  window.dispatchEvent(new CustomEvent("overlay-state-change", { detail: nextState }));
}

function withLocalMeta(nextState) {
  return {
    ...nextState,
    meta: {
      ...(nextState.meta || {}),
      updatedAt: new Date().toISOString(),
      updatedBy: "local-operator",
    },
  };
}

export function subscribeOverlayState(callback) {
  if (firebaseEnabled && db) {
    const liveDoc = doc(db, ...docPath);
    return onSnapshot(
      liveDoc,
      (snapshot) => {
        callback(snapshot.exists() ? deepMerge(defaultOverlayState, snapshot.data()) : defaultOverlayState);
      },
      () => callback(readLocalState()),
    );
  }

  callback(readLocalState());
  const onStorage = (event) => {
    if (event.key === storageKey) callback(readLocalState());
  };
  const onCustom = (event) => callback(event.detail || readLocalState());
  window.addEventListener("storage", onStorage);
  window.addEventListener("overlay-state-change", onCustom);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("overlay-state-change", onCustom);
  };
}

export async function saveOverlayState(nextState) {
  const localState = withLocalMeta(nextState);
  writeLocalState(localState);
  if (firebaseEnabled && db) {
    try {
      await setDoc(
        doc(db, ...docPath),
        {
          ...nextState,
          meta: {
            ...(nextState.meta || {}),
            updatedAt: serverTimestamp(),
            updatedBy: "operator",
          },
        },
        { merge: true },
      );
      return { ok: true, mode: "firebase" };
    } catch (error) {
      return { ok: false, mode: "local", error };
    }
  }
  return { ok: true, mode: "local" };
}

export function deepMerge(base, patch) {
  if (!patch || typeof patch !== "object") return base;
  return Object.entries(patch).reduce(
    (result, [key, value]) => {
      if (Array.isArray(value)) {
        result[key] = value;
      } else if (value && typeof value === "object" && base[key] && typeof base[key] === "object") {
        result[key] = deepMerge(base[key], value);
      } else {
        result[key] = value;
      }
      return result;
    },
    { ...base },
  );
}
