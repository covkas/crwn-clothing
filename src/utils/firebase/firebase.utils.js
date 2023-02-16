import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvDAHlJrbJYdXozWQEnkfpIvYLeHTArKo",
    authDomain: "crwn-clothing-db-cb4d7.firebaseapp.com",
    projectId: "crwn-clothing-db-cb4d7",
    storageBucket: "crwn-clothing-db-cb4d7.appspot.com",
    messagingSenderId: "140752981284",
    appId: "1:140752981284:web:616c1b8f622388b3ff37b1"
  };
  
  // Initialize Firebase
  const firebaseApp= initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    
    //if user data does not exist
    //create/set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('There was an error creating the user', error.message)
        }
    }
    //if user data exists
    //return userDocRef
    return userDocRef;
   

  }
