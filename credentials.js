import { 
  VITE_API_KEY, 
  VITE_AUTH_DOMAIN, 
  VITE_PROJECT_ID, 
  VITE_STORAGE_BUCKET, 
  VITE_MESSAGING_SENDER_ID, 
  VITE_APP_ID 
} from '@env';

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
};

console.log("🔥 Firebase se inicializó con config:", firebaseConfig);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
console.log(typeof initializeAuth);

// Exportar Auth y Firestore listos para usar
export const auth = getAuth(app);
export const db = getFirestore(app);

