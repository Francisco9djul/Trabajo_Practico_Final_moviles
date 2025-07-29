
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0R0UUfxwgpSAfHZy6F5v_ABaZHF33XUo",
  authDomain: "trabajo-practico-final-moviles.firebaseapp.com",
  projectId: "trabajo-practico-final-moviles",
  storageBucket: "trabajo-practico-final-moviles.firebasestorage.app",
  messagingSenderId: "504137663667",
  appId: "1:504137663667:web:139a9bf03b330285d55cc6"
};

console.log("🔥 Firebase se inicializó con config:", firebaseConfig);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
console.log(typeof initializeAuth);

// Exportar Auth y Firestore listos para usar
export const auth = getAuth(app);
export const db = getFirestore(app);

