import axios from "axios";
import { useEffect, useState } from "react";

export default function DeleteUser({ selecteduser,deleteuser, getdeleteuser }) {
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    setErrMsg("");
    setSuccMsg("");
  }, [selecteduser]);
  const DeleteUser = async (e) => {
    e.preventDefault();
    await axios
      .delete(`/users/${selecteduser}`, {
        headers: { Authorization: `Bearer ${token} ` },
      })
      .then((res) => {
        setSuccMsg("User Deleted Successfully!");
      })
      .catch((err) => {
        setErrMsg("ERR !");
      });
  };

  return (
    <>
      {deleteuser ? (
        <>
          
            <div className="absolute inset-0 z-10 overflow-y-auto ">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => getdeleteuser(false)}
            ></div>
            <div className=" min-h-screen overflow-y-hidden flex items-center  px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Delete User
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => getdeleteuser(false)}
                  >
                    <svg
                      
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                       
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
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
                <button
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  onClick={DeleteUser}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
