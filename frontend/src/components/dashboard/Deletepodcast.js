import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Deletepodcast({
  id,
  deletepodcast,
  getdeletepodcast,
  selectedpodcast
}
)

{
  const [idp, setidp] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  useEffect(() => {
    setErrMsg("");
    setSuccMsg("");
  }, [idp]);
  const Deletepodcast = async () => {
    axios
      .patch(`/podcasts/delete/${id}/${selectedpodcast}`)
      .then((res) => {
        setSuccMsg("Podcast Deleted Successfully!");
      })
      .catch((err) => {
        setErrMsg("Retry again !");
      });
  };

  return (
    
    <>
{deletepodcast ? (
  <>

    <div className="absolute inset-0 z-10 overflow-y-auto ">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => getdeletepodcast(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Delete podcast
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => getdeletepodcast(false)}
            >
              <svg
                aria-hidden="true"
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
            onClick={Deletepodcast}
          >
            Delete Podcast
          </button>
        </div>
      </div>
    </div>
  </>
) : null}
</>
  );
}
