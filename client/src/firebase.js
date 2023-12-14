// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGCVLPVHCnstcKnSJnBEBaSmZWZWVyWkQ",
  authDomain: "mern-real-estate-441cc.firebaseapp.com",
  projectId: "mern-real-estate-441cc",
  storageBucket: "mern-real-estate-441cc.appspot.com",
  messagingSenderId: "903947625564",
  appId: "1:903947625564:web:7b2a847159b298ad4d3299"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);