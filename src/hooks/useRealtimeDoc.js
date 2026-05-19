import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase.js";

export function useRealtimeDoc(path, fallback = null) {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    if (!db || !path?.length) return undefined;
    return onSnapshot(doc(db, ...path), (snapshot) => {
      setData(snapshot.exists() ? snapshot.data() : fallback);
    });
  }, [fallback, path]);

  return data;
}
