import {
  collection,
  query,
  getDoc,
  DocumentSnapshot,
  getDocs,
  where,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@utils/firebase';

interface DormChatInfo {
  id: string | null;
  name: string | null;
  users: string[];
  isPrivate: boolean | null;
  updatedAt: string | null;
  host: string | null;
}

export const getFirebaseData = async (
  collectionName: string,
  documentId: string,
  fieldName: string,
): Promise<any | null> => {
  try {
    const collectionRef = collection(db, collectionName);
    const documentRef = doc(collectionRef, documentId);
    const documentSnapshot: DocumentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      const fieldValue = documentSnapshot.get(fieldName);
      return fieldValue;
    } else {
      console.log('Document not found');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const getFirebaseDatabyKeyVal = async (initialCollection, key = null, value = null) => {
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

export const postFirebaseData = async (initialCollection, id, data) => {
  try {
    await setDoc(doc(db, initialCollection, id), data);

    console.log('good');
  } catch (error) {
    console.error('bad: ', error);
  }
};

export const updateFirebaseData = async (initialCollection, id, newData) => {
  try {
    const docRef = doc(db, initialCollection, id);

    await updateDoc(docRef, newData);

    console.log('good');
  } catch (error) {
    console.error('bad: ', error);
  }
};

export const addFirebaseData = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await setDoc(docRef, data);

    console.log('성공, 문서 ID:', documentId);
  } catch (error) {
    console.error(error);
  }
};

export const deleteFirebaseData = async (initialCollection, id) => {
  try {
    await deleteDoc(doc(db, initialCollection, id));
    console.log(`문서 ${id} 삭제 완료`);
  } catch (error) {
    console.error(error);
  }
};
