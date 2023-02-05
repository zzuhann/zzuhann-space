import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { userDocType } from "./authType";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Dispatch, SetStateAction } from "react";

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

interface IAddFireStore {
  target: string;
  data: {
    title: string;
    content: string;
    createTime: Date;
    updateTime: Date;
    author: string;
    tag: string[];
    cover?: string;
    url?: string;
  };
}

export function uploadStorageImage(
  photoName: string,
  file: File,
  fn?: (url: string) => void,
  isAddArticle?: boolean,
  articleInfo?: IAddFireStore
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
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        if (isAddArticle && articleInfo) {
          const articleData = {
            target: articleInfo.target,
            data: {
              title: articleInfo.data.title,
              content: articleInfo.data.content,
              createTime: articleInfo.data.createTime,
              updateTime: articleInfo.data.updateTime,
              author: articleInfo.data.author,
              tag: articleInfo.data.tag,
              url: downloadURL,
            },
          };
          uploadFirestore(articleData);
        }
        if (fn) {
          fn(downloadURL);
        }
      });
    }
  );
}

export async function uploadFirestore(props: IAddFireStore) {
  const docRef = doc(collection(db, props.target));
  await setDoc(docRef, props.data);
}
