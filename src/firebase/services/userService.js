import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

const usersRef = collection(db, "users");

export async function createUser(user) {
  await addDoc(usersRef, user);
}

export async function getUsers() {
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export function watchUsers(callback) {
  return onSnapshot(usersRef, snapshot => {
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(users);
  });
}

export async function updateUser(id, data) {
  await updateDoc(doc(db, "users", id), data);
}

export async function deleteUser(id) {
  await deleteDoc(doc(db, "users", id));
}
