import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const usersRef = collection(db, "users");

export async function createUser(email, password, extraData = {}) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    uid: user.uid,
    ...extraData
  });

  return user;
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function getUsers() {
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function updateUserData(uid, data) {
  await updateDoc(doc(db, "users", uid), data);
}

export async function deleteUserData(uid) {
  await deleteDoc(doc(db, "users", uid));
}