import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCmgiz4jZEGnVCajw_ewwi84W1EDYMezG8",
  authDomain: "autolog-firebase-authenticate.firebaseapp.com",
  projectId: "autolog-firebase-authenticate",
  storageBucket: "autolog-firebase-authenticate.appspot.com",
  messagingSenderId: "814606300366",
  appId: "1:814606300366:web:7d0bdac53893840e3bcc9f",
  measurementId: "G-72PEVQVFZJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);