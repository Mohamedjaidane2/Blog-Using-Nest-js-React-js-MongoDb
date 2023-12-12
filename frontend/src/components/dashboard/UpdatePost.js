import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";


export default function UpdatePost(
  { id,selectedpost,updatepost,getupdatepost}

) {
  const [selectedCoverPic, setSelectedCoverPic] = useState(null);
  const [selectedContentPic, setSelectedContentPic] = useState(null);
  const [cover, setcover] = useState('');
  const [title, settitle] = useState('');
  const [mediaLink, setmediaLink] = useState('');
  const [description, setdescription] = useState('');
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
 

  const formDataCover = new FormData(); 
  if(selectedCoverPic!==null){
    formDataCover.append( 
        "mediaLink", 
        selectedCoverPic, 
        selectedCoverPic.name 
      );
  }
  const formDataContent = new FormData(); 
  if(selectedContentPic!==null){
    formDataContent.append( 
        "mediaLink", 
        selectedContentPic, 
        selectedContentPic.name 
      );
  }
 //upload cover
  const uploadCover =()=>{
    axios.post("/posts/content-upload" , formDataCover).then(res=>{
        setcover(res.data.url)
        setSuccMsg('Cover Uploaded Successfully!')
      }).catch((err)=>{
        setErrMsg('Select An Image !')
      })
      }

  //upload content
  const uploadMedia =()=>{
    axios.post("/posts/content-upload" , formDataContent).then(res=>{
        setmediaLink(res.data.url)
        setSuccMsg('Content Uploaded Successfully!')
      }).catch((err)=>{
        setErrMsg('Select A file !')
      })
      }
      const chargeCover = (e) => {
        setSelectedCoverPic(e.target.files[0]);
      };
      const chargeContent = (e) => {
        setSelectedContentPic(e.target.files[0]);
      };

  const handleUpdate = async () => {
    const data = {
      cover:cover,
      mediaLink:mediaLink,
      title:title,
      description : description
    }; 
    axios
      .patch(`/posts/update/${id}/${selectedpost}`, data)
      .then((res) => {
        setSuccMsg("Article Updated successfully!");
      })
      .catch((err) => {
        setErrMsg("Article not found")
      });
  };
  useEffect(() => {
    setErrMsg("");
    setSuccMsg("");
  }, [title,description]);
  return (
    <>
      {updatepost ? (
        <>
          <div className="absolute inset-0 z-10 overflow-y-auto ">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => getupdatepost(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Posts
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => getupdatepost(false)}
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
                  <div className="mb-6">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="file_input"
                    >
                      Upload Cover
                    </label>
                    <input
                    
                      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      onChange={chargeCover}
                      type="file"
                    />
                    <button
                      onClick={uploadCover}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Upload Cover
                    </button>
                  </div>
                  <div className="mb-6">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      htmlFor="file_input"
                    >
                      Upload Media
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      onChange={chargeContent}
                      type="file"
                    />
                    <button
                      onClick={uploadMedia}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Upload Media
                    </button>
                  </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm w-full font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="title"
                  >
                    title
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="Title"
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="description"
                    onChange={(e) => setdescription(e.target.value)}
                    value={description}
                  />
                </div>
                <button
                  className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                  onClick={handleUpdate}
                >
                  Update Post
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>

  );
}
    