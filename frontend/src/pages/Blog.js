import Hero from "../components/blog/Hero";
import Stories from "../components/blog/Stories";
import About from "../components/blog/About";
import Podcast from "../components/blog/Podcast";
import Subscribe from "../components/blog/Subscribe";
import {
  useParams
} from 'react-router-dom';
const  Blog  = ()=> {
  const { blogLink } = useParams();
  return (
    <>
      <Hero />
      <Stories blogLink={blogLink}/>
      <About  blogLink={blogLink}/>
      <Podcast  blogLink={blogLink}/>
      <Subscribe />
    </>
  );
}


export default Blog