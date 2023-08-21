"use client";

import { useState } from "react";
import { getQuestionSet, isUserAttempted } from "@/firebase/FetchData";
import { testStore } from "@/components/States";
import { useRouter } from "next/navigation";

function TestAttempt() {
  const [testId, setTestId] = useState<string>("");
  const setQuestionSet = testStore((state) => state.setQuestionSet);
  const router = useRouter();

  return (
    <div className="mt-16">
      <div className="join">
        <input
          className="input input-bordered input-primary join-item"
          placeholder="Test Id"
          type="text"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
        />
        <button
          className="btn btn-primary join-item rounded-r-full"
          onClick={() => {
            if (testId !== "") {
              getQuestionSet(setQuestionSet, testId);
              router.push("/test_attempt/test");
            }
          }}
        >
          Find Test
        </button>
      </div>
    </div>
  );
}

export default TestAttempt;
