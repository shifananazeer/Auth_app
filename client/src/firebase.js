// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  "AIzaSyA_5PMwaHHExTX5r-3j9LLBEUF1ilqGwtg",
  authDomain: "mern-auth-1b687.firebaseapp.com",
  projectId: "mern-auth-1b687",
  storageBucket: "mern-auth-1b687.appspot.com",
  messagingSenderId: "397797340326",
  appId: "1:397797340326:web:2ee628838eda0ffb01b067"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);