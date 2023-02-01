import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { userDocType } from "./authType";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Editor } from "@tiptap/react";

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
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        fn(downloadURL);
      });
    }
  );
}
