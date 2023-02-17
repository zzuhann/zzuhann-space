import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { userDocType } from "./authType";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Dispatch, SetStateAction } from "react";
import { IAddFireStore } from "./articleType";

export async function getFirestoreDataById(
  collection: string,
  id: string,
  fn?: (user: userDocType) => void,
  setState?: Dispatch<SetStateAction<string[]>>
) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    if (fn) fn(docSnap.data() as userDocType);
    if (setState) setState(docSnap.data().tags);
  } else {
    console.log("No such document!");
  }
}

export async function getDataById(collection: string, id: string) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export async function getCollection(
  targetCollec: string,
  fn: (arr: []) => void
) {
  const q = query(collection(db, targetCollec));

  const querySnapshot = await getDocs(q);
  const arr: any = [];
  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });
  fn(arr);
}

export async function delFireStoreDataById(targetCollec: string, id: string) {
  await deleteDoc(doc(db, targetCollec, id));
}

export function uploadStorageImage(
  photoName: string,
  file: File,
  fn: (url: string) => void
) {
  const storageRef = ref(storage, `images/${photoName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        fn(downloadURL);
      });
    }
  );
}

export async function uploadFirestore(props: IAddFireStore) {
  const docRef = doc(collection(db, props.target));
  await setDoc(docRef, props.data);
}

interface Props<T extends object> {
  data: T;
  target: string;
  id: string;
}

export async function updateFirestoreById<T extends object>({
  target,
  id,
  data,
}: Props<T>) {
  const targetRef = doc(db, target, id);
  await updateDoc(targetRef, data);
}
