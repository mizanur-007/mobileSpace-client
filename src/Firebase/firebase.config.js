// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBba2K5rxUFxchglR9dg5S5l84f3m-9gg",
  authDomain: "mobilespace-27c3f.firebaseapp.com",
  projectId: "mobilespace-27c3f",
  storageBucket: "mobilespace-27c3f.appspot.com",
  messagingSenderId: "427662057929",
  appId: "1:427662057929:web:5693555a09ef65f7d40818"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;