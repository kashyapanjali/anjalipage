import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMEbxEPQKUG633_Z5m8pdB7azPd_eWfaw",
    authDomain: "anjalipageauth.firebaseapp.com",
    projectId: "anjalipageauth",
    storageBucket: "anjalipageauth.firebasestorage.app",
    messagingSenderId: "582126842278",
    appId: "1:582126842278:web:21613530d178d92bb35f67",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
