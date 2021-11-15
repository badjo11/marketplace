// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgNdsm1vMNeExR4NneCVZH0QRCVog7V6M",
    authDomain: "my-makers-project.firebaseapp.com",
    projectId: "my-makers-project",
    storageBucket: "my-makers-project.appspot.com",
    messagingSenderId: "1093675046668",
    appId: "1:1093675046668:web:edd2f0e76aa82fd146db29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)