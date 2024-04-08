// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHvd1Et85faDPHVAJHaFGD4-fMgv1PQ4A",
  authDomain: "optipick-4df25.firebaseapp.com",
  projectId: "optipick-4df25",
  storageBucket: "optipick-4df25.appspot.com",
  messagingSenderId: "775006695748",
  appId: "1:775006695748:web:e2a8f8c9b400e4312e6711",
  measurementId: "G-BJLVLP1F2V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);