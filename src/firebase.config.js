// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyfBVvbR8Uw1-a1LBEkqqBW2Tr8ETb0NE",
  authDomain: "job-portal-cc8e9.firebaseapp.com",
  projectId: "job-portal-cc8e9",
  storageBucket: "job-portal-cc8e9.firebasestorage.app",
  messagingSenderId: "594466968936",
  appId: "1:594466968936:web:202319ac92f373e64672dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{db};
