import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBjl99hfyTXOi1plmvbOLKjChN3H7kZbgA",
    authDomain: "movie-app-28aa3.firebaseapp.com",
    projectId: "movie-app-28aa3",
    storageBucket: "movie-app-28aa3.appspot.com",
    messagingSenderId: "549241104885",
    appId: "1:549241104885:web:17e123268c564ebcb898bc"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);