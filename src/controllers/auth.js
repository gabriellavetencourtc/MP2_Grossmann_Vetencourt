import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, db, googleProvider } from '../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export const signInWithCredentials = async (
  email,
  password,
  name,
  lastName,
  favVideoGame,
  username
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const usersCollection = collection(db, 'users');
    const documentData = {
      nombre: name,
      apellido: lastName,
      videojuego_preferido: favVideoGame,
      username: username,
      membresias: [],
    };
    const userDocRef = doc(usersCollection, user.uid);
    await setDoc(userDocRef, documentData);
    alert('user created successfully!!');
  } catch (error) {
    console.log(error);
  }
};
export const signInWithGoogleProvider = async (
  name,
  lastName,
  favVideoGame,
  username
) => {
  //TODO: add logic to handle sign in with google to complete user info
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    const usersCollection = collection(db, 'users');
    const documentData = {
      nombre: name,
      apellido: lastName,
      videojuego_preferido: favVideoGame,
      username: username,
      membresias: [],
    };
    const userDocRef = doc(usersCollection, user.uid);
    await setDoc(userDocRef, documentData);
  } catch (error) {
    console.log(error);
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
export const logInWithCredentials = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('user logged in successfully!!');
  } catch (error) {
    console.log(error);
  }
};
export const logInWithGoogleProvider = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.log(error);
  }
};
