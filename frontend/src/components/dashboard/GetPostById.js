import axios from "axios";
import { useEffect, useState } from "react";
import points from "../../assets/img/points.svg";

export default function GetPostById() {
  const [id, setId] = useState([{}]);
  const [postsdisplay, setpostsDisplay] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [post, getPost] = useState({});
  const [idp, setidp] = useState("");

  const token = localStorage.getItem("token");
  axios
    .get("auth/profile", { headers: { Authorization: `Bearer ${token} ` } })
    .then((res) => {
      setId(res.data.id);
    });
  const getPostById = () => {
    axios
      .get(`/posts/${id}/${idp}`)
      .then((res) => {
        getPost(res.data);
        setpostsDisplay(true);
      })
      .catch((err) => {
        setErrMsg('Post Not Found !')
      });
  };
  return (
    <>
      <div className="auth_item">
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <label className="auth_label" htmlFor="_id">
          Enter the Post Id
        </label>
        <input
          type="text"
          className="auth_input"
          id="_id"
          onChange={(e) => setidp(e.target.value)}
          value={id}
          required
        />
      </div>
      <div className="btn_display">
        <button className="btn_Sec btn_footer" onClick={getPostById}>
          Get Post By ID
        </button>
      </div>
      <div
        className={
          !postsdisplay
            ? "hidden"
            : "grid place-self-center justify-items-center "
        }
      >
        <>
          <section className="cards_post pb-[80px]">
            <div className="card_item_post">
              <img src={post.cover} className="card_img" />
              <div className="box">
                <div>
                  <div className="time">
                    <p>
                      {post.articleCreationDate}{" "}
                      <span className="font-bold">.</span>
                    </p>
                    <img src={points} />
                  </div>
                  <div className=" box_container">
                    <h1 className="box_title">{post.title}</h1>
                    <p className="text-[15px]">PostID: {post.id}</p>
                    <p className="box_p">{post.description}</p>
                  </div>
                </div>
                <div className="interaction">
                  <p>0 view</p>
                  <p>0 comments</p>
                </div>
              </div>
            </div>
          </section>
        </>
      </div>
    </>
  );
}
