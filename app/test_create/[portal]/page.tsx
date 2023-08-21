"use client";

import Head from "next/head";
import { useState,useEffect } from "react";
import { AddQuestionsToTest } from "@/firebase/AddOperation";
import { UpdateQuestionsInTest } from "@/firebase/UpdateOperation";
import { getQuestionSet } from "@/firebase/FetchData";
import { testStore } from "@/components/States";
import { useRouter } from "next/navigation";

type AllParams = {
  params: Params;
  searchParams: SearchParams;
};

type Params = {
  portal: string;
};
type SearchParams = {
  name: string;
  id: string;
};
interface InputItem {
  id: number;
  question: string;
  options: Options[];
}

interface Options {
  option: string;
  isCorrect: boolean;
}

const Portal = (params: AllParams) => {
  
  const testId = params.searchParams.id

  const questionSet:any = testStore((state) => state.questionSet);
  const setQuestionSet = testStore((state) => state.setQuestionSet);
  
  const router = useRouter()
  
  useEffect(() => {
    if (testId !== "") {
      getQuestionSet(setQuestionSet, testId);
    }
  }, [questionSet])

  const isFirstCreation = questionSet[0]?.questionSet?.questions === undefined ? [
    { id: 1, question: "", options: [] },
  ] :  questionSet[0]?.questionSet?.questions

  const [inputs, setInputs] = useState<InputItem[]>(isFirstCreation);


  const handleInputChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, question: event.target.value } : input
      )
    );
  };

  const handleAddInput = () => {
    const newId = inputs.length + 1;
    setInputs((prevInputs) => [
      ...prevInputs,
      { id: newId, question: "", options: [] },
    ]);
  };

  const handleRemoveInput = (id: number) => {
    setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
  };

  const handleAddOption = (id: number) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => {
        if (input.id === id) {
          const newOptions = [
            ...input.options,
            { option: "", isCorrect: false },
          ];
          return { ...input, options: newOptions };
        }
        return input;
      })
    );
  };

  const handleOptionInputChange = (
    id: number,
    optionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => {
        if (input.id === id) {
          const newOptions = [...input.options];
          newOptions[optionIndex] = {
            option: event.target.value,
            isCorrect: false,
          };
          return { ...input, options: newOptions };
        }
        return input;
      })
    );
  };

  const handleRemoveOption = (id: number, optionIndex: number) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => {
        if (input.id === id) {
          const newOptions = [...input.options];
          newOptions.splice(optionIndex, 1);
          return { ...input, options: newOptions };
        }
        return input;
      })
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const hasEmptyInput = (input: InputItem) => {
      return (
        input.question === "" ||
        input.options.length === 0 ||
        input.options.some((value) => value.option === "") ||
        input.options.every((value) => value.isCorrect === false)
      );
    };

    const hasEmptyInputInArray = (inputs: InputItem[]) => {
      for (const input of inputs) {
        if (hasEmptyInput(input)) {
          return true;
        }
      }
      return false;
    };

    if (hasEmptyInputInArray(inputs)) {
      alert("Invalid");
    } else {
      questionSet[0]?.questionSet?.questions === undefined ? 
      AddQuestionsToTest(
        event,
        {testName:params.searchParams.name, testId: params.searchParams.id, questions: inputs }      
        )
      : 
      UpdateQuestionsInTest(
        event,
        {testName:params.searchParams.name, testId: params.searchParams.id, questions: inputs },
        questionSet[0]?.id,
        router
      )

      getQuestionSet(setQuestionSet, testId);
    }
  };

  const handleIsCorrectOption = (
    id: number,
    optionIndex: number,
  ) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => {
        if (input.id === id) {
          const newOptions = input.options.map((option, index) => {
            if (index === optionIndex) {
              return {
                option: option.option,
                isCorrect: true,
              };
            }
            return {
              option: option.option,
              isCorrect: false,
            };
          });
          return { ...input, options: newOptions };
        }
        return input;
      })
    );
  };

  
  return (
    <>
      <Head>
        <title>{params.searchParams.id}</title>
      </Head>
      <div className="mt-12 grid justify-center">
        <h1 className="text-center text-xl">{params.searchParams.name}</h1>
        <p className="text-center mt-2">TestID - {questionSet[0]?.questionSet?.testId}</p>
        <p className="mt-6 text-xs text-center">Tick the circle after option input field to mark it as correct answer</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 mt-4">
            {inputs.map((input) => (
              <div key={input.id} className="mt-5 p-3 md:p-4 border border-violet-400 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    className="input input-info w-300 md:w-400 lg:w-800"
                    value={input.question}
                    onChange={(event) => handleInputChange(input.id, event)}
                    placeholder="Question"
                  />
                  <button
                    type="button"
                    className="btn btn-outline btn-error btn-xs sm:btn-sm md:btn-md"
                    onClick={() => handleRemoveInput(input.id)}
                  >
                    X
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-3 mt-4">
                    {input.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex flex-wrap items-center gap-2">
                        <input
                          type="text"
                          className="input input-accent w-200 md:w-400 max-w-xs"
                          value={option.option}
                          onChange={(event) =>
                            handleOptionInputChange(
                              input.id,
                              optionIndex,
                              event
                            )
                          }
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        <input
                          type="radio"
                          className="radio radio-success"
                          name={`correct${input.id}`}
                          checked={input.options[optionIndex].isCorrect}
                          onChange={() =>
                            handleIsCorrectOption(
                              input.id,
                              optionIndex
                            )
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-outline btn-error btn-xs sm:btn-sm md:btn-md"
                          onClick={() =>
                            handleRemoveOption(input.id, optionIndex)
                          }
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md"
                    onClick={() => handleAddOption(input.id)}
                  >
                    Add Option
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="my-10 flex gap-4 justify-center">
            <button
              type="button"
              className="btn btn-outline btn-secondary btn-xs sm:btn-sm md:btn-md"
              onClick={handleAddInput}
            >
              Add Question
            </button>

            <button
              type="submit"
              className="btn btn-outline btn-success btn-xs sm:btn-sm md:btn-md"
            >
              {questionSet[0]?.questionSet?.questions === undefined ? "Submit" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Portal;
