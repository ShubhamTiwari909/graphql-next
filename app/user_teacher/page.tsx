"use client";

import { testStore } from "@/components/States";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


type User = {
  id: string | null,
  type:string
}

function UserOrTeacher() {
  // const [id,setId] = useState<number|null>(null)
  const [createUser, setCreateUser] = useState<User>({ type: "student", id: "" });

  const router = useRouter();
  const isLoggedIn = testStore((state) => state.loggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, []);

  const handleRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUser({id:sessionStorage.getItem("uid"), type: e.target.value});
  };
  return (
    <section className="mt-16">


      <div className="flex flex-wrap gap-10 justify-center mt-16">
          <div className="mt-4 flex gap-4">
            Teacher <input
              id="createUserId"
              type="radio"
              value="teacher"
              className="radio radio-success"
              name="type"
              onChange={handleRadioButtonChange}
            />
            Student <input
              id="createUserId"
              type="radio"
              value="student"
              className="radio radio-success"
              name="type"
              checked
              onChange={handleRadioButtonChange}
            />
          </div>
          <button className="btn join-item rounded-r-full" onClick={() => {
            router.push(`${createUser.type === "student" ? "/test_attempt" : "/test_create"}`)
          }}>
           {createUser.type === "student" ? "Login with Student ID" : "Login with Teacher ID"} 
          </button>
      </div>
    </section>
  );
}

export default UserOrTeacher;
