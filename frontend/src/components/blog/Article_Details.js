import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

const Article_Details = () => {
  const { article_id } = useParams();
  const { blogLink } = useParams();
  const [User,setUser]=useState({})
  const [Post,setPost]=useState({})
  const [mediaLink,setmediaLink]=useState('')
  const [id, setid] = useState("");
var mp4=false
useEffect(() => {

  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}, []);
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
        axios
        .get(`posts/${id}/${article_id}`)
        .then((res) => {
          const result = res.data;
          setPost(result);
          setmediaLink(result.mediaLink)
        })
        .catch((err) => {
        });

  },[id])
  console.log('medialink :'+mediaLink)
  if(mediaLink&&mediaLink.includes('.mp4')){
    mp4=true
  }
  return (
    <>
    <section className='about_page'>
      <div>
        <section className=''>
          <div className='about_item2'>
            <p>{Post.articleCreationDate}</p>
            <div className='about_item2_title'>
              <h1>{Post.title}</h1>
            </div>
            <div className='about_item2_caption '>
              <div>Life, Faith, Confidence</div>
            </div>
            {mp4 ? (<Player
      playsInline
      poster="/assets/poster.png"
      src={Post.mediaLink}
    />):(
        <img src={Post.mediaLink} />
    )}
            <div >
              <p className='about_item2_p'>
                {Post.description}
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
    </>
  );
};

export default Article_Details;
