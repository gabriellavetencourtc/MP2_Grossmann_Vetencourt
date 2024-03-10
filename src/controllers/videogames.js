import { db } from '../config/firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

export const getAllVideogames = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'videogames'));
    var videogames = [];
    querySnapshot.forEach((doc) => {
      videogames.push(doc.data());
    });
    return videogames;
  } catch (error) {
    console.log(error);
  }
};
