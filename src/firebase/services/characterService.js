import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const charactersRef = collection(db, "characters");

export async function getCharacters() {
  const charactersRef = collection(db, "characters");
  const charactersSnap = await getDocs(charactersRef);

  const characters = [];

  for (const charDoc of charactersSnap.docs) {
    const charData = { id: charDoc.id, ...charDoc.data(), habilities: [] };

    const habilitiesRef = collection(db, `characters/${charDoc.id}/habilities`);
    const habilitiesSnap = await getDocs(habilitiesRef);

    for (const habDoc of habilitiesSnap.docs) {
      const habData = { id: habDoc.id, ...habDoc.data(), scenes: {} };

      const sceneCollections = ["scene1", "scene2", "scene3", "scene4"];

      for (const sceneName of sceneCollections) {
        const scenesRef = collection(
          db,
          `characters/${charDoc.id}/habilities/${habDoc.id}/${sceneName}`
        );

        const scenesSnap = await getDocs(scenesRef);

        habData.scenes[sceneName] = scenesSnap.docs.map(d => ({
          id: d.id,
          ...d.data()
        }));
      }

      charData.habilities.push(habData);
    }

    characters.push(charData);
  }

  return characters;
}

export async function updateCharacterData(uid, data) {
  await updateDoc(doc(db, "characters", uid), data);
}

export async function deleteCharacterData(uid) {
  await deleteDoc(doc(db, "characters", uid));
}