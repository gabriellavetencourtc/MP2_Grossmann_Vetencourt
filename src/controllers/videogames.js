import { db } from '../config/firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

export const getAllVideogames = async () => {
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

export const getVideogameById = async (videogameId) => {
  try {
    if (!videogameId) {
      console.error('videogameId is empty');
      return null;
    }
    const videoGamesCollection = collection(db, 'videogames');
    const videoGamesDocRef = doc(videoGamesCollection, videogameId);
    const docSnap = await getDoc(videoGamesDocRef);
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
