import { memo } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER, ALL_USERS } from "./Queries";
import { useCounterStore } from "./UsersList";

const CreateUser = () => {

  const id = useCounterStore((state) => state.id);
  const name = useCounterStore((state) => state.name);
  const setName = useCounterStore((state) => state.setName);
  const age = useCounterStore((state) => state.age);
  const setAge = useCounterStore((state) => state.setAge);
  const role = useCounterStore((state) => state.role);
  const setRole = useCounterStore((state) => state.setRole);
  const isEmployee = useCounterStore((state) => state.isEmployee);
  const setIsEmployee = useCounterStore((state) => state.setIsEmployee);
  const isUpdate = useCounterStore((state) => state.isUpdate);
  const setIsUpdate = useCounterStore((state) => state.setIsUpdate);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.target.value));
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIsEmployee(event.target.value === "true");
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: ALL_USERS }],
  });

  return (
    <form className="flex flex-wrap items-center justify-center gap-5 py-5  px-4 bg-gradient-to-r from-slate-800 to-black">
      <div className="flex gap-4 justify-between w-full md:w-fit items-center">
        <label className="font-semibold text-white">Name</label>
        <input
          className="border border-blue-400 rounded-md px-2 py-1 w-52"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="flex gap-4 justify-between w-full md:w-fit items-center">
        <label className="font-semibold text-white">Age</label>
        <input
          className="border border-blue-400 rounded-md px-2 py-1 w-52"
          type="number"
          value={age}
          onChange={handleAgeChange}
        />
      </div>
      <div className="flex gap-4 justify-between w-full md:w-fit items-center">
        <label className="font-semibold text-white">Role</label>
        <input
          className="border border-blue-400 rounded-md px-2 py-1 w-52"
          type="text"
          value={role}
          onChange={handleRoleChange}
        />
      </div>
      <div className="flex gap-4 justify-between w-full md:w-fit items-center">
        <p className="font-semibold text-white">Employee</p>
        <label className="text-white">
          <input
            type="radio"
            value="true"
            checked={isEmployee === true}
            onChange={handleOptionChange}
          />
          True
        </label>

        <label className="text-white">
          <input
            type="radio"
            value="false"
            checked={isEmployee === false}
            onChange={handleOptionChange}
          />
          False
        </label>
      </div>
      <div className="flex justify-center w-full md:w-fit ml-4 md:ml-0">
        {isUpdate ? (
          <>
            <button
              className="px-4 py-2 rounded-lg bg-blue-400 text-white"
              onClick={(e) => {
                e.preventDefault();
                if (name === "" || role === "") {
                  alert("Fill all the details");
                } else {
                  updateUser({
                    variables: {
                      updatedUser: {
                        id,
                        name,
                        age,
                        role,
                        isEmployee,
                      },
                    },
                  }).then(() => {
                    setName("");
                    setAge(18);
                    setRole("");
                    setIsEmployee(false);
                  });

                  setIsUpdate(false);
                }
              }}
            >
              Update
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-red-400 text-white ml-3"
              onClick={() => {
                setIsUpdate(false);
                setName("");
                setAge(18);
                setRole("");
                setIsEmployee(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            onClick={(e) => {
              e.preventDefault();
              if (name === "" || role === "") {
                alert("Fill all the details");
              } else {
                createUser({
                  variables: {
                    newUser: {
                      name,
                      age,
                      role,
                      isEmployee,
                    },
                  },
                }).then(() => {
                  setName("");
                  setAge(18);
                  setRole("");
                  setIsEmployee(false);
                });
              }
            }}
          >
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default memo(CreateUser);
