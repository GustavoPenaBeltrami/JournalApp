// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwms138X0edWQoapavTFZLOdWZrddZicU",
  authDomain: "react-cursos-16390.firebaseapp.com",
  projectId: "react-cursos-16390",
  storageBucket: "react-cursos-16390.appspot.com",
  messagingSenderId: "482478308020",
  appId: "1:482478308020:web:0bb59415390fcc7d3875e1"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//Autenticacion de usuarios en mi DB
export const FirebaseAuth = getAuth( FirebaseApp );

//Base de datos
export const FirebaseDB = getFirestore( FirebaseApp );