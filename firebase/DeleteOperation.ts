import {  deleteDoc,doc } from "firebase/firestore";
import { database } from "./firebaseConfig";
import { getTests } from "./FetchData";

export const DeleteTest = async (
  e: React.FormEvent,
  id:string,
  setTests: any,
) => {
  e.preventDefault();

  try {
    // Add the data to the Firestore collection
    await deleteDoc(
      doc(
        database,
        `Examinations/`,
        id
      )
    ).then(() => {
      // Reset the form fields
      // reloading data
      getTests(setTests);
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
