// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6rI0udACKhKeZ42gFSJTKDB6DnryZikw",
  authDomain: "dawn-of-heros.firebaseapp.com",
  projectId: "dawn-of-heros",
  storageBucket: "dawn-of-heros.appspot.com",
  messagingSenderId: "194193442957",
  appId: "1:194193442957:web:b5e9450549b96878147ac4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
