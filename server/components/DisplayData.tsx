import { useQuery, useMutation } from "@apollo/client";
import { ALL_USERS, DELETE_USER } from "./Queries";
import { memo } from "react";
import { MdDeleteForever } from "react-icons/md";
import { BsFillPenFill } from "react-icons/bs";
import { useCounterStore } from "./UsersList";

interface User {
  name: string;
  role: string;
  id: string;
  isEmployee: boolean;
  age: number;
}

const DisplayData = () =>  {
  const setId = useCounterStore((state) => state.setId);
  const setName = useCounterStore((state) => state.setName);
  const setAge = useCounterStore((state) => state.setAge);
  const setRole = useCounterStore((state) => state.setRole);
  const setIsEmployee = useCounterStore((state) => state.setIsEmployee);
  const setIsUpdate = useCounterStore((state) => state.setIsUpdate);

  const { data, loading, error } = useQuery<{ users: User[] }>(ALL_USERS);

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Some Error Occurred...</p>;
  }

  return (
    <main className="px-5 mt-10">
      <h1 className="text-slate-900 text-center text-lg font-bold">All Users</h1>
      <section className="mt-10">
        <div className="flex gap-6 justify-center flex-wrap mt-3">
          {data && 
          data.users.length === 0 ? <h1 className="text-xl font-bold"> No User Found</h1> : 
            data?.users.map((user: User) => {
              return (
                <div
                  key={user.id}
                  className="flex flex-col justify-between group border border-blue-400 rounded-lg w-60 p-4
                 hover:bg-slate-900 hover:border-none hover:outline hover:outline-blue-400 hover:outline-offset-4 
                 transition ease-in-out"
                >
                  <div>
                    <h1 className="text-xl font-bold group-hover:text-slate-100">
                      Name: {user.name}
                    </h1>
                    <p className="group-hover:text-blue-200">
                      Role: {user.role}
                    </p>
                    <p className="group-hover:text-violet-200">
                      Age: {user.age}
                    </p>
                    <p
                      className={`${
                        user.isEmployee.toString() === "true"
                          ? "group-hover:text-green-200"
                          : "group-hover:text-red-200"
                      }`}
                    >
                      Employee: {user.isEmployee.toString()}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-4 items-center">
                    <button
                      className="text-red-500"
                      onClick={() => {
                        console.log(user.id);
                        deleteUser({
                          variables: {
                            delUser: {
                              id: user.id,
                            },
                          },
                        });
                      }}
                    >
                      <MdDeleteForever size="1.2rem" color="#e65252" />
                    </button>
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        setId(Number(user.id));
                        setName(user.name);
                        setAge(user.age);
                        setIsEmployee(user.isEmployee);
                        setRole(user.role);
                        setIsUpdate(true);
                      }}
                    >
                      <BsFillPenFill size="1rem" color="#64a9f9" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </main>
  );
}

export default memo(DisplayData)