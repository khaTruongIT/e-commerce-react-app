import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import {firstInputPolyfill} from "web-vitals/dist/modules/lib/polyfills/firstInputPolyfill";

const config =  {
    apiKey: "AIzaSyAJ9rwXqJLrQaKuLrwN5X6tJR-dZz3TCHc",
    authDomain: "e-commere-8724b.firebaseapp.com",
    projectId: "e-commere-8724b",
    storageBucket: "e-commere-8724b.appspot.com",
    messagingSenderId: "505382105144",
    appId: "1:505382105144:web:7251017e561b877dbb36cd",
    measurementId: "G-XMX8BCYFKZ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;