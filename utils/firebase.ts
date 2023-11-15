import { initializeApp } from 'firebase/app';
import { doc, getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, setDoc } from 'firebase/firestore';
import {
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  ref,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDeQ4zMxyvFXmdUgsoXmWo-4gaLXUqIDtM',
  authDomain: 'howgwatalk.firebaseapp.com',
  projectId: 'howgwatalk',
  storageBucket: 'howgwatalk.appspot.com',
  messagingSenderId: '1036173696574',
  appId: '1:1036173696574:web:cb872c1d1535741d0e3b6f',
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

// 특정 유저 ID에 따른 class를 가져오기
export async function getUsersClass(userId) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDocs(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData && userData.class) {
        return userData.class;
      } else {
        console.error('User data or class information not found.');
        return null;
      }
    } else {
      console.error('User document not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user class:', error);
    return null;
  }
}

export { app, db, storage };
