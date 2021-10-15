// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByeoxnPXdA0k8K_gwXs5JSl72bHFSfqao",
  authDomain: "blog-d9c9e.firebaseapp.com",
  projectId: "blog-d9c9e",
  storageBucket: "blog-d9c9e.appspot.com",
  messagingSenderId: "801480041883",
  appId: "1:801480041883:web:bd72786b0008a8bdd1ad3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
