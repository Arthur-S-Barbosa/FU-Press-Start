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

const classRef = collection(db, "class");

export async function createClass(name, dmUid, password) {
  return await addDoc(classRef, {
    name,
    dmId: dmUid,
    actualScene: 1,
    password: password
  });
}

export async function getClasses() {
  const snapshot = await getDocs(classRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export function watchClasses(callback) {
  return onSnapshot(classRef, snapshot => {
    const classes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(classes);
  });
}

export async function updateClass(id, data) {
  await updateDoc(doc(db, "class", id), data);
}

export async function deleteClass(id) {
  await deleteDoc(doc(db, "class", id));
}
