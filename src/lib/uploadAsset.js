import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase.js";

export async function uploadAsset(file, folder = "uploads") {
  if (!storage) throw new Error("Firebase Storage belum dikonfigurasi.");
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const assetRef = ref(storage, `${folder}/${Date.now()}-${safeName}`);
  await uploadBytes(assetRef, file);
  return getDownloadURL(assetRef);
}
