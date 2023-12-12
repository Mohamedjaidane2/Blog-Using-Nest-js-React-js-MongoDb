import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../node_modules/video-react/dist/video-react.css";
import ReactAudioPlayer from "react-audio-player";


const Podcast_Details = (
    {pod,podcastD,setPodcastD}
) => {
  const [Podcast,setPodcast]=useState({})

useEffect(() => {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}, []);



  return (
    <>
    {podcastD ? (
      <>
    
        <div className="absolute inset-0 z-10 overflow-y-auto ">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setPodcastD(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {pod.title}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setPodcastD(false)}
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

              <div className="mb-6 w-full">
              <ReactAudioPlayer src={pod.mediaLink} autoPlay controls />     
            </div>
            </div>
          </div>
        </div>
      </>
    ) : null}
    </>

  );
};

export default Podcast_Details;
