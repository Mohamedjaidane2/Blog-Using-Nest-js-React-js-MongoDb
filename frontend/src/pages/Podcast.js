
import React, { useEffect } from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import appel from "../assets/music/appel.svg";
import google from "../assets/music/google.svg";
import wifi from "../assets/music/wifi.svg";
import stitcher from "../assets/music/stitcher.svg";
import spotify from "../assets/music/spotify.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Podcast_Details from "../components/blog/Podcast_Details";

export default function Poadcast() {
  const [selectedpodcast,setselectedpodcast]=useState('')
  const { blogLink } = useParams();
  const [filter, setFilter] = useState("");
  const [Podcast, getPodcast] = useState([{}]);
  const [id,setId]=useState("")
  const [picture,setPicture]=useState("")
  const [userName, setUserName] = useState("");
  const [podcastD,setPodcastD]=useState(false)
  const [pod,getpod]=useState({})
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`/users/personal/blog/${blogLink}`)
      .then((res) => {
        setId(res.data._id);
        setUserName(res.data.username);
      })
      .catch((err) => {});

      axios.get(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
      setPicture(res.data.picture);
      console.log(res.data)
      })

    axios
      .get(`/podcasts/mypodcasts/${id}`)
      .then((res) => {
        const Podcasts = res.data;
        getPodcast(Podcasts);
        console.log(res.data);
      })
      .catch((err) => {});
  }, [id]);
  console.log('selected id '+selectedpodcast )


  const searchText = (e) => {
    setFilter(e.target.value);
  };
  let dataSearch = Podcast.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase())
    );
  });
 

  const handelClickD=(param)=>{
    axios
    .get(`podcasts/${id}/${selectedpodcast}`)
    .then((res) => {
      getpod(res.data)
      /* 
      setmediaLink(result.mediaLink) */
    })
    .catch((err) => {
    });
    setPodcastD(true);
    setselectedpodcast(param)
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
  console.log('pod = '+pod)

  return (
    <>
      <section className='podcast_page_section'>
        <div className='section_title'>
          <h1>My Podcast</h1>
        </div>
        <div className='podcast_parts_display'>
          <div className='podcast_part1'>
            <img src={picture} className='podcast_part1_img ' />
          </div>
          <div className='podcast_part2'>
            <div>
              <h1 className='podcast_part2_title'>Lessons of Faith</h1>
              <div className='podcast_part2_name'>
                <span>Isabella Reeves</span>
              </div>
              <div>
                <div className='podcast_part2_icons'>
                  <img src={wifi} />
                  <img src={appel} />
                  <img src={spotify} />
                  <img src={google} />
                  <img src={stitcher} />
                </div>
              </div>
            </div>
            <div className='podcast_part2_p'>
              <p>
                All the info, audio or video that's needed to show and play your
                podcast episodes is contained in the RSS feed. Head to Settings
                and connect your podcast's RSS feed.
              </p>
            </div>
          </div>

          <div className='podcast_search'>
            <div>
              <input
                type={"text"}
                value={filter}
                onChange={searchText.bind(this)}
                placeholder='Search podcast'
                className='podcast_search_input'
              />
            </div>
          </div>
        </div>
        <Podcast_Details pod={pod} podcastD={podcastD} setPodcastD={setPodcastD} />
        <div className='podcast_musicList'>
          {dataSearch.map((item, index) => {
            return (
              <div key={item.id}>
                <div className='music_cover'>
                <img src={item.cover} className="music_img cursor" onClick={()=>{handelClickD(item.id)}}/>
                </div>
                <h1 className='music_title'>{item.title}</h1>
              </div>
              
            );
          })}
        </div>
      </section>
    </>
  );
}
