import {
  collection,
  query,
  getDocs,
  where,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@utils/firebase';

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

  const add = (initialCollection, data) => {
    const set = async () => {
      try {
        const docRef = await addDoc(collection(db, initialCollection), data);
        const docId = docRef.id;

        console.log('성공, 문서 ID:', docRef.id);
      } catch (error) {
        console.error(error);
      }
    };
    set();
  };

  const _delete = (initialCollection, id) => {
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
    get,
    post,
    update,
    add,
    _delete,
  };
};
