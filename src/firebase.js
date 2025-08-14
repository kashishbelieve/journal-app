import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJcs7YK7HfFm4mDKWMvgiDicr718tOaXY",
  authDomain: "journalapp-4e0c5.firebaseapp.com",
  projectId: "journalapp-4e0c5",
  storageBucket: "journalapp-4e0c5.firebasestorage.app",
  messagingSenderId: "138561901271",
  appId: "1:138561901271:web:4bcfe250c8d1e62221d692"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
