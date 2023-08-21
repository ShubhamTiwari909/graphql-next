import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "./firebaseConfig";

export const getTests = async (setTests: any) => {
  const databaseRef = collection(database, `Examinations/`);
  const q = query(
    databaseRef,
    where("uid", "==", sessionStorage.getItem("uid"))
  );

  await getDocs(q).then((response) => {
    setTests(
      response.docs.map((data) => {
        return { ...data.data(), id: data.id };
      })
    );
  });
};

export const getQuestionSet = async (setTest: any, testId: string) => {
  const databaseRef = collection(database, `Examinations/tests/${testId}/`);

  await getDocs(databaseRef).then((response) => {
    setTest(
      response.docs.map((data) => {
        return { ...data.data(), id: data.id };
      })
    );
  });
};


// export const isUserAttempted = async (testId: string, email: string,setUserAttempted:any) => {
//   const scoreRef = collection(database, `Examinations/scores/${testId}/`);

//   await getDocs(scoreRef).then((response) => {
//     const score = response.docs.map((data) => {
//       return { ...data.data(), id: data.id };
//     });

//     const userAttempted = score.filter((item: any) => {
//       return item.score[0].email == email
//     });

//     if(userAttempted.length !== 0) {
//       setUserAttempted(true)
//     }
//     else {
//       setUserAttempted(false)
//     }
//     console.log(userAttempted)
//   });
// };
