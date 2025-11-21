// Importa os módulos necessários da SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 

// Suas credenciais copiadas do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANsIQRHs8sk6RIUSCItPC9ydTMRsb41OU",
  authDomain: "fu-press-start.firebaseapp.com",
  projectId: "fu-press-start",
  storageBucket: "fu-press-start.firebasestorage.app",
  messagingSenderId: "1092765461602",
  appId: "1:1092765461602:web:3d3842d05bf92a1108753b",
  measurementId: "G-DV6NTCLN4Q"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporta serviços que você quiser usar
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
