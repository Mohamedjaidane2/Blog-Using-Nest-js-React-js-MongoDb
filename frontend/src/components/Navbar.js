import React from "react";
import { useState } from "react";
import svg from ".././assets/img/logoIcon.svg";
import search from ".././assets/img/search.svg";
import menu from ".././assets/img/menu.svg";
import xIcon from ".././assets/img/xIcon.svg";
import { useScroll } from "../hook/useScroll";
import { Link, useParams } from "react-router-dom";

export default function Navbar() {
  const { blogLink } = useParams();
  const [nav, setNav] = useState(false);
  const handelClick = () => setNav(!nav);
  const { y, x, scrollDirection } = useScroll();

  const styles = {
    active: {
      visibility: "visible",
      transition: "all 0.5s",
    },
    hidden: {
      visibility: "hidden",
      transition: "all 0.5s",
      transform: "translateY(0%)",
    },
  };

  return (
    <header
      className=' fixed w-full top-0 '
      style={
        scrollDirection === "down" || y === 0 ? styles.active : styles.hidden
      }
    >
      <nav className='navbar '>
        <div>
          <div className='navbar_brand'>
            <span>L - O - F</span>
          </div>
          <div className='navbar_svg'>
            <img src={svg} className='logo_svg' />
          </div>
        </div>
        <div className='nav_right'>
          <div className='nav_item'>
          <Link to ={`/${blogLink}/`}className='nav_link'>
              Blog
            </Link>
            <Link to ={`/${blogLink}/podcast/`} className='nav_link'> 
              Podcast
           </Link>
            <Link to ={`/${blogLink}/about/`} className='nav_link'>
              About
            </Link>
            
            <a className='nav_link' href='#contact'>
              Contact
            </a>
            <div className='menu' onClick={handelClick}>
              {!nav ? <img src={menu} /> : <img src={xIcon} />}
            </div>
          </div>
          <div className={!nav ? "hidden" : "nav_mobile "}>
            <div className='nav_link_m'>
            <Link to ={'/:blogLink/'}>Blog</Link>
              
            </div>
            <div className='nav_link_m'>
              <Link to ={'/:blogLink/podcast/'}>Podcast</Link>
            </div>
            <div className='nav_link_m'>
              <Link to ={'/:blogLink/about/'}>About</Link>
            </div>
            <div className='nav_link_m'>
              <a href='#contact'>Contact</a>
            </div>
          </div>
          <div className='nav_search '>
            <div className='nav_search_input'>
              <input placeholder='  Search' />
            </div>
            <button className='nav_search_btn '>
              <div>
                <img src={search} className='searchicon' />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
