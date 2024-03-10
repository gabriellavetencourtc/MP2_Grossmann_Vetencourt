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

export const getClubById = async (clubId) => {
  try {
    if (!clubId) {
      console.error('clubId is empty');
      return null;
    }
    const clubsCollection = collection(db, 'clubs');
    const clubDocRef = doc(clubsCollection, clubId);
    const docSnap = await getDoc(clubDocRef);
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
