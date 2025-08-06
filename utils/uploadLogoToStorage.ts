import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadLogoToStorage(file: File, userId: string) {
  const storage = getStorage();
  const path = `logos/${userId}/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}