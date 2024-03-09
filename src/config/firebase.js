import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAURu9xHF4cXEkf4kVyuXWaxf4XQzSBkVk',
  authDomain: 'mp2-grossmann-vetencourt-76c1a.firebaseapp.com',
  projectId: 'mp2-grossmann-vetencourt',
  storageBucket: 'mp2-grossmann-vetencourt.appspot.com',
  messagingSenderId: '653508378792',
  appId: '1:653508378792:web:95d107f4295883f694829d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
