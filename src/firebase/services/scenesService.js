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

const scenesRef = collection(db, "scenes");

export async function createScene(scene) {
  await addDoc(scenesRef, scene);
}

export async function getScenes() {
  const snapshot = await getDocs(scenesRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export function watchScenes(callback) {
  return onSnapshot(scenesRef, snapshot => {
    const scenes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(users);
  });
}

export async function updateScene(id, data) {
  await updateDoc(doc(db, "scenes", id), data);
}

export async function deleteScene(id) {
  await deleteDoc(doc(db, "scenes", id));
}
