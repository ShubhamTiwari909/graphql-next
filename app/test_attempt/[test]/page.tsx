"use client";

import {useEffect} from "react";
import QuestionSet from "@/components/QuestionSet";
import { testStore } from "@/components/States";
import { useRouter } from "next/navigation";
import { AddScore } from "@/firebase/AddOperation";
import { isUserAttempted } from "@/firebase/FetchData";

function page() {
  const questionSet = testStore((state) => state.questionSet);
  const selectedOptions = testStore((state) => state.selectedOptions);
  const setSelectedOptions = testStore((state) => state.setSelectedOptions);

  const submitted = testStore((state) => state.submitted);
  const setSubmitted = testStore((state) => state.setSubmitted);
  const userAttempted = testStore((state) => state.userAttempted);
  const setUserAttempted= testStore((state) => state.setUserAttempted);

  const router = useRouter();

  // useEffect(() => {
  //   isUserAttempted(questionSet[0]?.questionSet?.testId,sessionStorage.getItem("email") as string,setUserAttempted)
  // }, [])
  

  const calculateScore = () => {
    let sum = 0;
    selectedOptions.forEach((element) => {
      if (element === true) {
        sum++;
      }
    });
    return sum;
  };

  const handleSubmit = (event: React.FormEvent):void => {
    AddScore(event, {
      testName: questionSet[0]?.questionSet?.testName,
      testId: questionSet[0]?.questionSet?.testId,
      score: {username: sessionStorage.getItem("username"),email:sessionStorage.getItem("email"), score:calculateScore()}
    });
    setSelectedOptions([]);
    setSubmitted(true);
    router.push("/test_attempt");
    setTimeout(() => {
      setSubmitted(false);
    }, 1000);
  };

  return (
    <>
      <div>
        {questionSet[0]?.questionSet.questions === undefined ? (
          <h1>No test loaded</h1>
        ) : submitted ? (
          <h1>Your Test Submitted</h1>
        ) : (
          questionSet[0]?.questionSet.questions.map((question: any) => {
            return (
              <QuestionSet
                key={question.question}
                question={question}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            );
          })
        )}
      </div>
      <button className="btn btn-success" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </>
  );
}

export default page;
