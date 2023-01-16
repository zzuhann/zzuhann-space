import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { userDocType } from "./authType";

export async function getFirestoreDataById(
  collection: string,
  id: string,
  fn: (user: userDocType) => void
) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    fn(docSnap.data() as userDocType);
  } else {
    console.log("No such document!");
  }
}
