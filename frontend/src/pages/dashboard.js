import React from "react";
import { useEffect, useState } from "react";
import menu from "../assets/img/menu_w.svg";
import xIcon from "../assets/img/xIcon_w.svg";
import { Link, Route, Routes } from "react-router-dom";
import CreateUser from "../components/dashboard/CreateUser";
import GetUsers from "../components/dashboard/GetUsers";
import UpdateUser from "../components/dashboard/UpdateUser";
import DeleteUser from "../components/dashboard/DeleteUser";
import Profile from "../components/dashboard/Profile";
import axios from "axios";
import Addpost from "../components/dashboard/AddPost";
import GetAllPosts from "../components/dashboard/GetAllPosts";
import Deletepodcast from "../components/dashboard/Deletepodcast";
import Updatepodcast from "../components/dashboard/Updatepodcast";
import Addpodcast from "../components/dashboard/Addpodcast";
import Getpodcasts from "../components/dashboard/Getpodcasts";
import DeletePost from "../components/dashboard/DeletePost";
import UpdatePost from "../components/dashboard/UpdatePost";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [role, setrole] = useState("");
  const [picture, setPicture] = useState("");
  const [id, setId] = useState("");
  //Modals
  const [profile, getprofile] = useState(false);
  const [selecteduser, setselecteduser] = useState("");

  const [createuser, getcreateuser] = useState(false);
  const [updateuser, getupdateuser] = useState(false);
  const [deleteuser, getdeleteuser] = useState(false);

  const [addpost, getaddpost] = useState(false);
  const [updatepost, getupdatepost] = useState(false);
  const [deletepost, getdeletepost] = useState(false);

  const [addpodcast, getaddpodcast] = useState(false);
  const [updatepodcast, getupdatepodcast] = useState(false);
  const [deletepodcast, getdeletepodcast] = useState(false);

  const [selectedpodcast, setselectedpodcast] = useState("");
  const [selectedpost, setselectedpost] = useState("");

  const [postid, setpostid] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("auth/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUserName(res.data.username);
        setrole(res.data.role);
        setId(res.data.id);
      })
      .catch((err) => {
        window.location = "/dashboard/login";
      });
    axios
      .get(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setPicture(res.data.picture);
        console.log(res.data)
      });
  }, [id,profile]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/dashboard/login";
  };

  const [sidebar, setSidebar] = useState(false);
  const handelClick = () => setSidebar(!sidebar);
  return (
    <>
      <div className="dashbord">
        <div className="slidebar">
          <div className="slidebar_content">
            <Link to="/dashboard/">
              <div className="slidebar_title">
                <h1>Dashboard</h1>
              </div>
            </Link>
            <div className="slidebar_items">
              <ul>
                <Link to="/dashboard/posts">
                  <li className="slidebar_item">
                    {" "}
                    <p>Posts</p>
                  </li>
                </Link>
                <Link to="/dashboard/podcasts">
                  <li className="slidebar_item">
                    {" "}
                    <p>Podcasts</p>
                  </li>
                </Link>
                <Link to="/dashboard/login" >
                  <li className="slidebar_item" onClick={logout}>
                    <p>Log out</p>
                  </li>
                </Link>
              </ul>
            </div>
            <div className="menu_dash" onClick={handelClick}>
              {!sidebar ? <img src={menu} /> : <img src={xIcon} />}
            </div>
            <div className={!sidebar ? "hidden " : "slidebar_items_mobile "}>
              <ul>
                <Link to="/dashboard/posts">
                  <li className="slidebar_item_m">
                    <p>Posts</p>
                  </li>
                </Link>
                <Link to="/dashboard/podcasts">
                  <li className="slidebar_item_m">
                    <p>Podcasts</p>
                  </li>
                </Link>
                <Link to="/dashboard/login">
                  <li className="slidebar_item_m" onClick={logout}>
                  <p>Log out</p>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:relative md:h-[100vh] md:w-full md:mr-[80px] md:ml-[377px]">
          <div className="dash_content">
            <div className="topbar">
              <div className="topbar_items">
                <div
                  className="topbar_item_left"
                  onClick={() => getprofile(true)}
                >
                  <h1>
                    {userName} / {role}
                  </h1>
                </div>
                <div>
                  <span className=" animate-pulse  absolute inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  <img
                    onClick={() => getprofile(true)}
                    src={picture}
                    className="topbar_profil_pic"
                  />
                </div>
              </div>
            </div>
            {role === "admin" ? null : (
              <button
                type="button"
                className=" inline-block ml-3 my-6 px-6 py-2.5 bg-violet-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => getcreateuser(true)}
              >
                Add User
              </button>
            )}

            <Profile id={id} profile={profile} getprofile={getprofile} />
            <CreateUser createuser={createuser} getcreateuser={getcreateuser} />

            <Addpost addpost={addpost} getaddpost={getaddpost} />
            <Addpodcast addpodcast={addpodcast} getaddpodcast={getaddpodcast} />

            <div className="grid grid-cols-4 gap-6">
              {role === "admin" ? null : (
                <>
                  <GetUsers
                    setselecteduser={setselecteduser}
                    getdeleteuser={getdeleteuser}
                    getupdateuser={getupdateuser}
                  />
                </>
              )}
              <DeleteUser
                selecteduser={selecteduser}
                deleteuser={deleteuser}
                getdeleteuser={getdeleteuser}
              />
              <UpdateUser
                selecteduser={selecteduser}
                updateuser={updateuser}
                getupdateuser={getupdateuser}
              />
            </div>
            <Routes>
              <Route
                path="/posts"
                element={
                  <>
                    <h1 className="text-[20px] font-bold text-violet-900 p-9">
                      Posts
                    </h1>
                    <button
                      type="button"
                      className=" inline-block ml-3 px-6 py-2.5 bg-violet-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => getaddpost(true)}
                    >
                      Add Post
                    </button>
                    <div className="grid grid-cols-2 gap-6 w-full pb-9">
                      <GetAllPosts
                        getupdatepost={getupdatepost}
                        getdeletepost={getdeletepost}
                        deletepost={deletepost}
                        updatepost={updatepost}
                        setselectedpost={setselectedpost}
                      />
                    </div>
                    <DeletePost
                      id={id}
                      selectedpost={selectedpost}
                      deletepost={deletepost}
                      getdeletepost={getdeletepost}
                    />
                    <UpdatePost
                      id={id}
                      selectedpost={selectedpost}
                      updatepost={updatepost}
                      getupdatepost={getupdatepost}
                    />
                  </>
                }
              />
              <Route
                path="/podcasts"
                element={
                  <>
                    <h1 className="text-[20px] font-bold text-violet-900 p-9 ">
                      Podcasts
                    </h1>
                    <button
                      type="button"
                      className=" inline-block ml-3 px-6 py-2.5 bg-violet-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => getaddpodcast(true)}
                    >
                      Add Podcast
                    </button>
                    <div className="grid grid-cols-2 gap-6 w-fullpb-9 ">
                      <Getpodcasts
                        updatepodcast={updatepodcast}
                        deletepodcast={deletepodcast}
                        getupdatepodcast={getupdatepodcast}
                        getdeletepodcast={getdeletepodcast}
                        setselectedpodcast={setselectedpodcast}
                      />
                    </div>
                    <Deletepodcast
                      id={id}
                      selectedpodcast={selectedpodcast}
                      deletepodcast={deletepodcast}
                      getdeletepodcast={getdeletepodcast}
                    />
                    <Updatepodcast
                      id={id}
                      selectedpodcast={selectedpodcast}
                      updatepodcast={updatepodcast}
                      getupdatepodcast={getupdatepodcast}
                    />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
