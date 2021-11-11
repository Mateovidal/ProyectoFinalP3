import app from "firebase/app";
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAF8IiHJNynTAD0Pv937CEhj6LmFm4bCk0",
  authDomain: "proyectofinalprogra3-5a9bf.firebaseapp.com",
  projectId: "proyectofinalprogra3-5a9bf",
  storageBucket: "proyectofinalprogra3-5a9bf.appspot.com",
  messagingSenderId: "1086922523705",
  appId: "1:1086922523705:web:d54b0b1cb34f8477e979e8"
};

 app.initializeApp(firebaseConfig);

 // la constante guarda todos los metodos que neceisto para guardar  info adentro de la platafroma
 export const auth = firebase.auth();
 export const storage = app.storage();
 export const db = app.firestore();