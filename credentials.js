
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {

  apiKey: "AIzaSyCDYZuT-xoWEkjOCkYiw3dVYyqasQs-Bbg",

  authDomain: "tp3-appmov.firebaseapp.com",

  projectId: "tp3-appmov",

  storageBucket: "tp3-appmov.firebasestorage.app",

  messagingSenderId: "1018858743793",

  appId: "1:1018858743793:web:9f645b910b99aab6914650"

};




// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
console.log(typeof initializeAuth);

export const getFirebaseAuth = () => getAuth(app);
export const getFirebaseFirestore = () => getFirestore(app);
console.log(getFirebaseAuth);

