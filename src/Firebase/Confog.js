// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth   } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk0Yln1jjoxZR-EtATnzvnSj0Q4PtRgno",
  authDomain: "new-project-level2.firebaseapp.com",
  projectId: "new-project-level2",
  storageBucket: "new-project-level2.appspot.com",
  messagingSenderId: "1026011058191",
  appId: "1:1026011058191:web:ff8b03c8e9ef8f28eb937a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);