import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCL5rbfLy_6-eVpSQJ9eO5M9n8t5KAQpEU",
  authDomain: "zzuhann-space.firebaseapp.com",
  databaseURL: "https://zzuhann-space-default-rtdb.firebaseio.com",
  projectId: "zzuhann-space",
  storageBucket: "zzuhann-space.appspot.com",
  messagingSenderId: "527860327648",
  appId: "1:527860327648:web:457445fb60643d2f7b1c85",
  measurementId: "G-4N0V0D5YYB",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
