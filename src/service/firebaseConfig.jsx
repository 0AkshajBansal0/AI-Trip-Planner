// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtW1rWz8N2mL9nSiUiuL6OeGV-_jXw9X8",
  authDomain: "ai-trip-planner-7023c.firebaseapp.com",
  projectId: "ai-trip-planner-7023c",
  storageBucket: "ai-trip-planner-7023c.firebasestorage.app",
  messagingSenderId: "423646240284",
  appId: "1:423646240284:web:8ce92ad739272bce8049d9",
  measurementId: "G-Y42RNM9V03"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);