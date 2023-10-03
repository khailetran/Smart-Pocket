// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl3pMbWK4Wd6UkWycV9-7nLvL-bMxeJh4",
  authDomain: "smart-pocket-417c9.firebaseapp.com",
  projectId: "smart-pocket-417c9",
  storageBucket: "smart-pocket-417c9.appspot.com",
  messagingSenderId: "357712790004",
  appId: "1:357712790004:web:f612288da0483fe5e1b9a1",
  measurementId: "G-H361FNTL0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};
