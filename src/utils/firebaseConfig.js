// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseApiKey = process.env.FIREBASE_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "cantinna-app.firebaseapp.com",
  projectId: "cantinna-app",
  storageBucket: "cantinna-app.firebasestorage.app",
  messagingSenderId: "328256068502",
  appId: "1:328256068502:web:de8c2710faf67744df1bb7",
  measurementId: "G-X5N75FNYTW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

export { db };
