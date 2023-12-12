import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function GetUserById() {
  const [user, getuser] = useState({});
  const [userdisplay, setUserDisplay] = useState(false);
  const [id, setid] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    setErrMsg("");
  }, [id]);
  const GetUserById = () => {
    axios
      .get(`/users/${id}`, { headers: { Authorization: `Bearer ${token} ` } })
      .then((res) => {
        const User = res.data;
        getuser(User);
        setUserDisplay(true);
      })
      .catch((err) => {
        setErrMsg("User Not Found !");
      });
  };
  return (
    <>
      <div className="auth_item">
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <label className="auth_label" htmlFor="_id">
          Enter the User Id
        </label>
        <input
          type="text"
          className="auth_input"
          id="_id"
          onChange={(e) => setid(e.target.value)}
          value={id}
          required
        />
      </div>
      <div className="btn_display">
        <button className="btn_Sec btn_footer" onClick={GetUserById}>
          Find User
        </button>
      </div>
      <div className={!userdisplay ? "hidden" : "userCard_list"}>
        <div className="user_card">
          <div className="User_cover">
            <img src={user.Picture} className="topbar_profil_pic" />
          </div>

          <div>
            <h1 className="User_username">{user.userName}</h1>
          </div>
          <div className="User_role">
            <h1>{user.role}</h1>
          </div>
          <div className="flex justify-between mt-[10px] justify-items-center">
            <div className="User_info">
              <label>LastName</label>
              <p>{user.lastName}</p>
            </div>
            <div className="User_info">
              <label>FirstName</label>
              <p>{user.firstName}</p>
            </div>
          </div>
          <div className="User_id">
            <label>User ID</label>
            <p>{user._id}</p>
          </div>
        </div>
      </div>
    </>
  );
}
