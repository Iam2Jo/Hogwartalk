import { initializeApp } from 'firebase/app';
import { doc, getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDoc, setDoc } from 'firebase/firestore';
import {
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  ref,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const db = getFirestore(app);

export async function getStorageURL(fileName) {
  const storageRef = ref(
    storage,
    `gs://howgwatalk.appspot.com/usersimage/${fileName}`,
  );
  try {
    const url = await getDownloadURL(storageRef);
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
}

export async function setStorageImage(file, fileName) {
  const storageRef = ref(
    storage,
    `gs://howgwatalk.appspot.com/usersimage/${fileName}`,
  );
  try {
    const uploadTask = await uploadBytesResumable(storageRef, file);
  } catch (error) {
    console.log(error);
  }
}

export async function setUsersClass(userId, userClass) {
  const data = { id: userId, class: userClass };
  console.log(data);
  try {
    const docRef = await setDoc(doc(db, 'users', userId), data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}

export async function getUsersClass(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.class || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error('사용자 클래스 검색 오류: ', error);
    return null;
  }
}
