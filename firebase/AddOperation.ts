import { collection, addDoc,arrayUnion } from "firebase/firestore";
import { database } from "./firebaseConfig";
import { getTests } from "./FetchData";

export const AddTest = async (
  e: React.FormEvent,
  data: string,
  setName: any,
  setTests: any
) => {
  e.preventDefault();

  try {
    // Add the data to the Firestore collection
    await addDoc(collection(database, `Examinations/`), {
      name: data,
      uid: sessionStorage.getItem("uid"),
    }).then(() => {
      // Reset the form fields
      setName("");

      // reloading data
      getTests(setTests);
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

type Question = {
  testName:string;
  testId: string;
  questions: QuestionFields[];
};

type QuestionFields = {
  id: number;
  question: string;
  options: Options[];
};

type Options = {
  option: string;
  isCorrect: boolean;
};

export const AddQuestionsToTest = async (
  e: React.FormEvent,
  data: Question
) => {
  e.preventDefault();

  try {
    // Add the data to the Firestore collection
    await addDoc(collection(database, `Examinations/tests/${data.testId}`), {
      questionSet: data,
    }).then(() => {
      // Reset the form fields
      console.log("Added successfully");
      // reloading data
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};



type Score = {
  testName:string;
  testId: string;
  score:ScoreMeta[]
};


type ScoreMeta = {
  name:string;
  email:string;
  score:number;
}


export const AddScore = async (
  e: React.FormEvent,
  data: Score
) => {
  e.preventDefault();

  try {
    const {testName,testId,score} = data
    // Add the data to the Firestore collection
    await addDoc(collection(database, `Examinations/scores/${testId}`), {
      testName,
      testId,
      score:arrayUnion(score)
    }).then(() => {
      // Reset the form fields
      console.log("Score Added successfully");
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
