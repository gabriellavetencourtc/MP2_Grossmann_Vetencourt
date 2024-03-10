import { db } from '../config/firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

export const getAllClubs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'clubs'));
    var clubs = [];
    querySnapshot.forEach((doc) => {
      clubs.push(doc.data());
    });
    return clubs;
  } catch (error) {
    console.log(error);
  }
};
