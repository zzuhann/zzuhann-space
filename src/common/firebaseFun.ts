import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { IAddFireStore } from './articleType';

interface Props<T extends object> {
  data: T;
  target: string;
  id: string;
}

export async function getDataById<T>(collection: string, id: string): Promise<T | null> {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as T;
  } else {
    console.log('No such document!');
    return null;
  }
}

export async function getCollection<T>(targetCollec: string): Promise<T[]> {
  const q = query(collection(db, targetCollec));
  const querySnapshot = await getDocs(q);
  const arr: T[] = [];
  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() } as T);
  });
  return arr;
}

export async function delFireStoreDataById(targetCollec: string, id: string) {
  await deleteDoc(doc(db, targetCollec, id));
}

export function uploadStorageImage(photoName: string, file: File): Promise<string> {
  const storageRef = ref(storage, `images/${photoName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      }
    );
  });
}

export async function uploadFirestore(props: IAddFireStore) {
  const docRef = doc(collection(db, props.target));
  await setDoc(docRef, props.data);
}

export async function updateFirestoreById<T extends object>({ target, id, data }: Props<T>) {
  const targetRef = doc(db, target, id);
  await updateDoc(targetRef, data);
}

export async function getDataByWhere<T>(targetCollec: string, targetKey: string, targetValue: string): Promise<T[]> {
  const q = query(collection(db, targetCollec), where(targetKey, '==', targetValue));

  const querySnapshot = await getDocs(q);
  const arr: T[] = [];
  querySnapshot.forEach((doc) => {
    arr.push({
      id: doc.id,
      ...doc.data(),
    } as T);
  });
  return arr;
}
