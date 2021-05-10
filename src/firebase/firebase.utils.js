import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

//google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;