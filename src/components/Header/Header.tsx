import React from 'react'
import './Header.css'
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header__container'>
      <div className='header__left'>
        <p className='logo'>MP2</p>
      </div>
      <div className='links'>
        <div className='link_tag'>
          <Link to="/videogames">Videogames</Link>
        </div>
        <div className='link_tag'>
          <Link to="/clubs">Clubs</Link>
        </div>
        {/* <div className='search_bar_wrapper'>
          <CiSearch size={24} color='#3A9E57'/>
          <input placeholder='search for a videogame...' className='search_bar'/>
        </div> */}
      </div>
      <div className='right'>
        <div className='btn'>
          <Link to="/login">Log In</Link>
        </div>
        <div className='btn'>
          <Link to="/signin">Sign In</Link>
        </div>
        <CgProfile size={36} color='#F3FEF6'/>
      </div>
    </div>
  )
}

export default Header