import { db } from "../lib/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { User } from "firebase/auth";

export async function getUserPosters(user: User) {
  const postersRef = collection(db, "posters");
  const q = query(
    postersRef,
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  // Map Firestore docs to a simple array
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}