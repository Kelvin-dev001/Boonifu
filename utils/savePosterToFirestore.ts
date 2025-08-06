import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";

// called after poster is generated
export async function savePosterToFirestore({
  user,
  form,
  imageUrl,
}: {
  user: User | null;
  form: {
    business: string;
    message: string;
    vibe: string;
    logo?: File | null;
    logoUrl?: string | null;
  };
  imageUrl: string;
}) {
  // Only save if logged in (or you can allow anon, up to you)
  if (!user) throw new Error("User not logged in.");

  const doc = await addDoc(collection(db, "posters"), {
    uid: user.uid,
    business: form.business,
    message: form.message,
    vibe: form.vibe,
    logoUrl: form.logoUrl || null, // Save logo URL if available
    imageUrl,
    createdAt: serverTimestamp(),
  });

  return doc.id;
}