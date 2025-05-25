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
  signInWithPopup, // ✅ Importado como signInWithPopup
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

// Colección de tareas
export const tasksCollection = collection(db, "tasks");

// Exporta todas las funciones necesarias
export {
  db,
  auth,
  provider,
  // Exporta signInWithPopup como signInWithGoogle
  signInWithPopup as signInWithGoogle, // ✅ Alias correcto
  signOut as logout,
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