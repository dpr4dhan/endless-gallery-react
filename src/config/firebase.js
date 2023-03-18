// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6sRPXHm95Oma6G2xh8mAZFqQ3Qe-JfwA",
    authDomain: "bitfumes-react-app.firebaseapp.com",
    projectId: "bitfumes-react-app",
    storageBucket: "bitfumes-react-app.appspot.com",
    messagingSenderId: "835552015082",
    appId: "1:835552015082:web:57a39e9d20a3e715c89d93"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;