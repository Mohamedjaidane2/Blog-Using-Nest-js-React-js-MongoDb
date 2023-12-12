import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile({ id, profile, getprofile }) {
  const [selectedPic, setSelectedPic] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [msg, setmsg] = useState("");
  const [pwd, setpwd] = useState("");
  const [old_pwd, setold_pwd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setbio] = useState("");
  const [userName,setUserName]=useState("")
  const [role,setrole]=useState('')
  const [pic,setpic]=useState('')
  const [bloglink,setbloglink]=useState('')
  const [changepicsection,getchangepicsection]=useState(false)
  const [changepwdsection,getchangepwdsection]=useState(false)
  const pichandelCLick=()=>{
    getchangepicsection(!changepicsection)
  }
  const pwdhandelCLick=()=>{
    getchangepwdsection(!changepwdsection)
  }
  const token = localStorage.getItem("token");
  axios
    .get(`/users/${id}`, { headers: { Authorization: `Bearer ${token} ` } })
    .then((res) => {
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setUserName(res.data.userName);
      setrole(res.data.role)
      setbio(res.data.bio);
      setpic(res.data.picture)
      setbloglink(res.data.blogLink)

    });
  const onFileChange = (e) => {
    setSelectedPic(e.target.files[0]);
  };
  const formData = new FormData();
  if (selectedPic !== null) {
    formData.append("picture", selectedPic, selectedPic.name);
  }
  const upload = () => {
    axios
      .post("users/profile/file-upload", formData)
      .then((res) => {
        setNewProfilePic(res.data.url);
        setmsg("Image Uploaded Successfully!");
      })
      .catch((err) => {
        setErrMsg("Select An Image !");
      });
  };
  const data = {
    picture: newProfilePic,
  };
  const changePic = () => {
    axios
      .patch(`users/profil/ChangeProfilePic/${id} `, data)
      .then((res) => {
        console.log(res);
        setmsg("Successfully!");
      })
      .catch((err) => {
        setErrMsg("Please Retry !");
      });
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const passData = {
      old_password_validation: old_pwd,
      password: pwd,
    };
    axios
      .patch(`/users/profil/changePassword/${id}`, passData)
      .then((res) => {
        setmsg("Password Changed Successfully!");
      })
      .catch((err) => {
        setErrMsg("Incorrect password !");
      });
  };
  useEffect(() => {
    setErrMsg("");
    setmsg("");
  }, []);
  return (
    <>
      {profile ? (
        <>
          <div className="  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[90%] my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="relative border-0 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 relative border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">Profile</h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => getprofile(false)}
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
                {/*body*/}
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
                    msg
                      ? "bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mt-3"
                      : "offscreen"
                  }
                  role="alert"
                >
                  {msg}
                </div>
                <div className="mx-auto w-11/12 relative">
                  <div className="flex justify-center  relative">
 
                    <div className=" relative ">
                      <div className="flex-col items-center pb-4 border-b-[3px] border-b-violet-600">
                      <div className="flex my-5 ">
                      <img
                        src={pic}
                          className="h-20 w-20 rounded-full object-cover "
                          alt="username"
                        />
                        <div className="ml-5">
                        <h2 className="block leading-relaxed font-medium text-gray-700 text-3xl">
                        {firstName} {lastName}
                        </h2>
                        <h2 className="block leading-relaxed font-light text-gray-400 text-l pb-3">
                          @{userName} / {role} / Blog Link : {bloglink}
                        </h2>
                        </div>
                        
                      </div>
                      
                        <button
                         className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                         onClick={pwdhandelCLick}
                         >
                         Change password
                        </button>
                        <button
                        onClick={pichandelCLick}
                        className="text-white ml-3 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                        >
                          Change profile picture
                        </button>
                        
                      </div>
                      <div className=" pt-3 pb-4 border-b-[3px] border-b-violet-600 ">
                        <span className="text-base max-w-[10px]">
                          {bio}
                        </span>
                      </div>
                      {
                        changepicsection?(
                          
                      <div className="mt-6 pb-4 border-b-[3px] border-b-violet-600 ">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Change Profile Picture
                      </label>
                      <input type="file" className="select_input" onChange={onFileChange} />
                       <div className="pt-4">
                       <button 
                        className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                        onClick={upload}>
                          Upload
                        </button>
                        <button 
                        className="text-white ml-3 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                        onClick={changePic}>
                          Apply Change
                        </button>
                      
                       </div>
                        
                  </div>
                        ):null
                      }
                      {changepwdsection ? (
                        <div className="mt-6">
                           <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Change Password
                      </label>
                                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                              Enter Your Current Password  
                                              </label>
                                                <input
                                                  type="password"
                                                  id="password"
                                                  onChange={(e) => setold_pwd(e.target.value)}
                                                  value={old_pwd}
                                                  required
                                                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                  
                                                />
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                              Enter Your New Password  
                                              </label>
                                                <input
                                                  type="password"
                                                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                  id="new_password"
                                                  onChange={(e) => setpwd(e.target.value)}
                                                  value={pwd}
                                                  required
                                                />
                                                  <button 
                                                  className="text-white mt-2 bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                                                  onClick={changePassword}>
                                                    Change password
                                                  </button>
                                                  </div>
                             
                      ):null}
                   
                        </div> 
                    </div>
                  </div>
                 

                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => getprofile(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
} /* 
<p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
{errMsg}
</p>
<p className={msg ? "succmsg" : "offscreen"} aria-live="assertive">
{msg}
</p>
<section className="w-[100%] pb-[60px]">
  <div className="section_title">
    <h1 className="">{firstName} {lastName}</h1>
  </div>
  <h1>Bio</h1>
  <p> {bio}</p>
<div className=" py-[50px] grid lg:grid-cols-2 lg:gap-[30px] place-self-center ">
<div className="profile_pic_section">
  <h1 className="profile_label cursor-pointer">
    Change Profile Picture
  </h1>
  <input type="file" className="select_input" onChange={onFileChange} />
  <div className="picture_event">
    <button className="btn_Primary" onClick={upload}>
      Upload
    </button>
    <button className="btn_Sec" onClick={changePic}>
      Apply Change
    </button>
  </div>
</div>
<div className="password_section">
  <h1 className="profile_label cursor-pointer">Change Password</h1>
  <h1 className="profile_label" htmlFor="_id">
    Enter Your Current Password
  </h1>
  <input
    type="password"
    className="auth_input"
    id="password"
    onChange={(e) => setold_pwd(e.target.value)}
    value={old_pwd}
    required
  />
  <h1 className="profile_label" htmlFor="_id">
    Enter Your New Password
  </h1>
  <input
    type="password"
    className="auth_input"
    id="new_password"
    onChange={(e) => setpwd(e.target.value)}
    value={pwd}
    required
  />
  <div className="py-[30px] m-auto">
    <button className="btn_Sec m-auto " onClick={changePassword}>
      Change password
    </button>
  </div>
</div>
</div>
</section> */
