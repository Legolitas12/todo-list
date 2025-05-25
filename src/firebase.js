// firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRhG2l7o8WnNNLe_ZRG1b8NfjyqVYIBhA",
  authDomain: "todo-list-react-e8452.firebaseapp.com",
  projectId: "todo-list-react-e8452",
  storageBucket: "todo-list-react-e8452.firebasestorage.app",
  messagingSenderId: "160823850566",
  appId: "1:160823850566:web:09c5b7e500b8840f9bbc47",
  measurementId: "G-NF3CSMFXWG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Funciones corregidas
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth); // ✅ Ahora usa auth

// Colección de tareas
export const tasksCollection = collection(db, "tasks");

// Exporta otras funciones necesarias
export {
  db,
  auth,
  provider,
  onAuthStateChanged,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
};