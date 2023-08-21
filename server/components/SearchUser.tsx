import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_NAME } from "./Queries";

interface User {
  name: string;
  role: string;
  id: string;
  isEmployee: boolean;
  age: number;
  friends: Friend[];
}

interface Friend {
  name: string;
  id: string;
}

function SearchUser() {
  const [searchUser, setSearchUser] = useState<string>("");

  const [findUser, { data: userData, error: userError }] = useLazyQuery<{
    userByName: User | null;
  }>(GET_USER_BY_NAME);

  return (
    <section className="mt-10 flex items-center flex-col">
      <div className="flex gap-4">
        <input
          className="border border-blue-400 rounded-md px-2 py-1"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-full"
          onClick={() => {
            findUser({
              variables: {
                name: searchUser,
              },
            });
          }}
        >
          Find
        </button>
      </div>

      {userData && (
        <div
          className="mt-6 group border border-blue-400 rounded-lg w-60 p-4
        hover:bg-slate-900 hover:border-none hover:outline hover:outline-blue-400 hover:outline-offset-4 
        transition ease-in-out"
        >
          <h1 className="text-xl font-bold group-hover:text-slate-100">
            Name: {userData.userByName?.name}
          </h1>
          <p className="group-hover:text-blue-200">
            Role: {userData.userByName?.role}
          </p>
          <p className="group-hover:text-violet-200">
            Age: {userData.userByName?.age}
          </p>
          <p
            className={`${
              userData.userByName?.isEmployee.toString() === "true"
                ? "group-hover:text-green-200"
                : "group-hover:text-red-200"
            }`}
          >
            Employee: {userData.userByName?.isEmployee.toString()}
          </p>
          <div className="mt-5">
            <h2 className="text-lg font-semibold group-hover:text-slate-100">
              Friends
            </h2>
            {userData.userByName?.friends.map((friend: Friend) => {
              return (
                <div key={friend.id}>
                  <p className="group-hover:text-pink-200">
                    Name: {friend.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {userError && <h1 className="mt-2 text-red-500">User Not found</h1>}
    </section>
  );
}

export default SearchUser;
