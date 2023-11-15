import {
  collection,
  query,
  getDocs,
  where,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const useFireFetch = () => {
  const get = async (initialCollection, key = null, value = null) => {
    try {
      if (key) {
        const Ref = collection(db, initialCollection);
        const q = query(Ref, where(key, '==', value));
        const querySnapshot = await getDocs(q);
        const userData = [];

        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });

        console.log('good');
        return userData;
      } else {
        const Ref = collection(db, initialCollection);
        const userData = [];
        const querySnapshot = await getDocs(Ref);

        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });

        console.log('good');
        return userData;
      }
    } catch (error) {
      console.error('bad: ', error);
    }
  };

  const post = async (initialCollection, id, data) => {
    try {
      await setDoc(doc(db, initialCollection, id), data);

      console.log('good');
    } catch (error) {
      console.error('bad: ', error);
    }
  };

  const update = async (initialCollection, id, newData) => {
    try {
      const docRef = doc(db, initialCollection, id);

      await updateDoc(docRef, newData);

      console.log('good');
    } catch (error) {
      console.error('bad: ', error);
    }
  };

  const deleteById = (initialCollection, id) => {
    const set = async () => {
      try {
        await deleteDoc(doc(db, initialCollection, id));
        console.log(`문서 ${id} 삭제 완료`);
      } catch (error) {
        console.error(error);
      }
    };
    set();
  };

  return {
    deleteById,
    get,
    update,
    post,
  };
};
