import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export default function UpdateUser({ selecteduser,updateuser, getupdateuser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    setErrMsg("");
    setSuccMsg("");
  }, [selecteduser]);

  const UpdateUser = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
    };
    axios
      .patch(`/users/${selecteduser}`, data, {
        headers: { Authorization: `Bearer ${token} ` },
      })
      .then((res) => {
        setSuccMsg("User Updated Successfully!");
      })
      .catch((err) => {
        setErrMsg("Err !");
      });
  };

  return (
    <>
      {updateuser ? (
        <>
          <div className="absolute inset-0 z-10 overflow-y-auto ">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => getupdateuser(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Users
                  </h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => getupdateuser(false)}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <div
                  className={
                    errMsg
                      ? "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mt-3"
                      : "offscreen"
                  }
                  role="alert"
                >
                  {errMsg}
                </div>

                <div
                  className={
                    succMsg
                      ? "bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mt-3"
                      : "offscreen"
                  }
                  role="alert"
                >
                  {succMsg}
                </div>

                
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm w-full font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="lastName"
                  >
                    firstName
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300  w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="userName"
                  >
                    LastName
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                  />
                </div>
                <button
                  className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                  onClick={UpdateUser}
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
