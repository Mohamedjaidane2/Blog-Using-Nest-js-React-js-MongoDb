import points from "../../assets/img/points.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../../pages/dashboard";
import {Routes, Route, Link,useNavigate } from "react-router-dom";
import Article_Details from "./Article_Details";

export default function Stories(props) {
  const blogLink = props.blogLink;
  const [User, setUser] = useState({});
  const [Posts, getPosts] = useState([{}]);
  const [id, setid] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/users/personal/blog/${blogLink}`)
      .then((res) => {
        setid(res.data._id);
      })
      .catch((err) => {});

    axios
      .get(`/posts/myposts/${id}`)
      .then((res) => {
        const Posts = res.data;
        getPosts(Posts);
        console.log(res.data);
      })
      .catch((err) => {});
  }, [id]);
  if (!id) {
    navigate("/notfound");
  }

 

  return (
    <>
      
      <div className="" id="blog">
        <section className="w-[100%] pb-[60px]">
          <div className="section_title">
            <h1 className="">All My Stories</h1>
          </div>
          <section className="cards">
            {Posts.map((res, idx) => {
              return (
                <>
                  <div className="card_item" key={res.id}>
                    <Link to={`/${blogLink}/${res.id}`}><img src={res.cover} className="card_img" /></Link>
                    <div className="box">
                      <div>
                        <div className="time">
                          <p>
                            {res.articleCreationDate}{" "}
                            <span className="font-bold">.</span>
                          </p>
                          <img src={points} />
                        </div>
                        <div className=" box_container">
                          <h1 className="box_title">{res.title}</h1>

                          <p className="box_p">{res.description}</p>
                        </div>
                      </div>
                      <div className="interaction">
                        <p>0 view</p>
                        <p>0 comments</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </section>
        </section>
      </div>
    </>
  );
}
