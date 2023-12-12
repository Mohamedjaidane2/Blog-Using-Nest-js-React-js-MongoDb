import {useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function About() {
  const { blogLink } = useParams();
  const navigate = useNavigate()
  const[User,setUser]=useState({})
  const [id, setid] = useState("");
  useEffect(()=>{
    axios
      .get(`/users/personal/blog/${blogLink}`)
      .then((res) => {
        setid(res.data._id);
      })
      .catch((err) => {});
    
      axios
        .get(`/users/${id}`)
        .then((res) => {
          const result = res.data;
          setUser(result);
        })
        .catch((err) => {
        });
  },[id])
  console.log("User profile :" + User.id);
  console.log("id :" + id);
  return (
    <section className='about_page'>
      <div>
        <div className='section_title'>
          <h1>About</h1>
        </div>
        <section className='about_page_items'>
          <div className='about_item1'>
            <img src={User.picture} className='about_img1' />
          </div>
          <div className='about_item2'>
            <div className='about_item2_title'>
              <h1>{User.firstName} {User.lastName}</h1>
            </div>
            <div className='about_item2_caption '>
              <div>My personal story</div>
              <div>Life, Faith, Confidence</div>
            </div>
            <div >
              <p className='about_item2_p'>
                {User.bio}
              </p>
            <div className="about_page_btn">
              <button className='btn_Primary' onClick={()=>{navigate(`/${blogLink}/`)}}>
                  My Blog
                </button>
            </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
