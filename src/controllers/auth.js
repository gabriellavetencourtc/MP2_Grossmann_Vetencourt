import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, db, googleProvider } from '../config/firebase';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

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
    const updatedUser = completeUserInfo(
      user,
      name,
      lastName,
      favVideoGame,
      username
    );
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};
export const signInWithGoogleProvider = async () => {
  //TODO: add logic to handle sign in with google to complete user info
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const completeUserInfo = async (
  user,
  name,
  lastName,
  favVideoGame,
  username
) => {
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
};

export const getUserById = async (userId) => {
  try {
    if (!userId) {
      console.error('userId is empty');
      return null;
    }
    const usersCollection = collection(db, 'users');
    const userDocRef = doc(usersCollection, userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
export const logInWithCredentials = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user.user;
  } catch (error) {
    console.log(error);
  }
};
export const logInWithGoogleProvider = async () => {
  try {
    const user = await signInWithPopup(auth, googleProvider);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const addNewMembership = async (userId, clubId) => {
  try {
    const userRef = doc(db, 'users', userId);
    // Set the "capital" field of the city 'DC'
    await updateDoc(userRef, {
      membresias: arrayUnion(clubId),
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const removeMembership = async (userId, clubId) => {
  try {
    const userRef = doc(db, 'users', userId);
    // Set the "capital" field of the city 'DC'
    await updateDoc(userRef, {
      membresias: arrayRemove(clubId),
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    // Set the "capital" field of the city 'DC'
    await updateDoc(userRef, userData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
