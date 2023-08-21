import {  updateDoc,doc } from "firebase/firestore";
import { database } from "./firebaseConfig";
import { getTests } from "./FetchData";

export const UpdateTest = async (
  e: React.FormEvent,
  id:string,
  data: string,
  setName: any,
  setTests: any,
  setUpdateId:any
) => {
  e.preventDefault();

  try {
    // Add the data to the Firestore collection
    await updateDoc(
      doc(
        database,
        `Examinations/`,
        id
      ),
      {
        name: data,
      }
    ).then(() => {
      // Reset the form fields
      setName("");
      setUpdateId("")
      // reloading data
      getTests(setTests);
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};



type Question = {
  testName:string,
  testId:string,
  questions: QuestionFields[]
}

type QuestionFields = {
   id: number, question: string, options: Options[] 
}

type Options = {
  option:string,
  isCorrect:boolean
}

export const UpdateQuestionsInTest = async (
  e: React.FormEvent,
  data: Question,
  testId:string,
  router:any
) => {
  e.preventDefault();

  try {
    // Update the data in the Firestore collection
    const testRef = doc(database, `Examinations/tests/${data.testId}`,testId);
    await updateDoc(testRef, {
      questionSet: data,
    }).then(() => {
      router.push("/test_create");
    });

  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

