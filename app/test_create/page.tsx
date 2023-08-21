"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { testStore } from "@/components/States";
import { AddTest } from "@/firebase/AddOperation";
import { UpdateTest } from "@/firebase/UpdateOperation";
import { DeleteTest } from "@/firebase/DeleteOperation";
import { getTests } from "@/firebase/FetchData";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { test } from "node:test";

type Data = string;

type Test = {
  id: string;
  name: string;
};

function Test() {
  const [tests, setTests] = useState([]);
  const router = useRouter();
  const isLoggedIn = testStore((state) => state.loggedIn);
  const setQuestionSet = testStore((state) => state.setQuestionSet);

  const [name, setName] = useState<Data>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  const loading = testStore((state) => state.loading);
  const setLoading = testStore((state) => state.setLoading);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
    getTests(setTests);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="p-10">
      {/* FORM */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Test Name..."
          className="input input-bordered input-info w-full max-w-xs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {isUpdating ? (
          <div className="space-x-3">
            <button
              className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md"
              onClick={(e) => {
                UpdateTest(e, updateId, name, setName, setTests, setUpdateId);
                setIsUpdating(false);
              }}
            >
              Update
            </button>
            <button
              className="btn btn-outline btn-error btn-xs sm:btn-sm md:btn-md"
              onClick={(e) => {
                setIsUpdating(false);
                setUpdateId("");
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md"
            onClick={(e) => {
              AddTest(e, name, setName, setTests);
              setQuestionSet([{ id: 1, question: "", options: [] }]);
            }}
          >
            Add
          </button>
        )}
      </div>

      {/* LIST OF TESTS */}
      <div className="flex gap-3 flex-wrap mt-10">
        {loading ? (
          <p className="text-center text-2xl">Loading...</p>
        ) : tests.length === 0 ? (
          <h1>No Tests found</h1>
        ) : (
          tests.map((test: Test) => {
            return (
              <div
                key={test.id}
                className="flex gap-2 glass rounded-lg items-center p-1"
              >
                <Link
                  className="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md"
                  href={{
                    pathname: `/test_create/${test.id}`,
                    query: { name: test.name, id: test.id },
                  }}
                  key={test.id}
                >
                  {test.name}
                </Link>
                <div className="flex flex-col gap-1">
                  <button
                    className="btn btn-sm btn-circle"
                    onClick={() => {
                      setIsUpdating(true);
                      setUpdateId(test.id);
                      setName(test.name);
                    }}
                  >
                    <FiEdit color="skyblue" />
                  </button>
                  <button
                    className="btn btn-sm btn-circle"
                    onClick={(e) => {
                      DeleteTest(e, test.id, setTests);
                      setIsUpdating(false);
                      setUpdateId("");
                      setName("");
                    }}
                  >
                    <AiTwotoneDelete color="crimson" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Test;
