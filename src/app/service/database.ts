import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configurações do seu projeto Firebase
const firebaseConfig = {
    // ... suas credenciais
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Cloud Firestore e obtém uma referência para o serviço
const db = getFirestore(app);