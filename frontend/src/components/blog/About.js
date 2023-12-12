import { useEffect, useState } from "react";
import axios from "axios";

export default function About(props) {
  const blogLink = props.blogLink;
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
  return(
    <>
    <div>
      <div className='section_title_double '>
        <h1>About</h1>
      </div>
      <section className='about_display'>
        <div className='about_g1 '>
          <div className='about_g1_text'>
            <h1>Hi, I'm {User.firstName}!</h1>
            <span>So good to have you here.</span>
          </div>
          <div className='about_g2'>
            <img src={User.picture} className='about_img' />
          </div>
          <div className='about_g1_p'>
            <p>
              {User.bio}
            </p>
          </div>
          <div className='btn_about'>
            <button className='btn_Primary'>Read more</button>
          </div>
        </div>
        <div className='about_g3'>
          <img src={User.picture} className='about_img' />
        </div>
      </section>
    </div>
  </> 
  )

}
