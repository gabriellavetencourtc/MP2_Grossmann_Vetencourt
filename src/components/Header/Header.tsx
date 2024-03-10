import React, { useEffect, useState } from 'react'
import './Header.css'
import { IoPersonCircle } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user';
import { logOutUser } from '../../controllers/auth';

function Header() {

  const { user } = useUser()

  const navigate = useNavigate()

  const [showProfileModal, setShowProfileModal] = useState(false)

  const [width, setWidth] = useState(window.innerWidth);
  const [showHamburgerNav, setShowHamburgerNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if(window.innerWidth){
        setShowHamburgerNav(false)
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavigateToProfile = () => {
    navigate('profile', {replace: true});
    setShowProfileModal(false)
  }

  const handleSignOut = async() => {
    setShowProfileModal(false)
    await logOutUser()
    navigate('/')
  }

  return (
    <div className='header__container'>
      <div className='header__left'>
        <p className='logo'>MP2</p>
      </div>
      {width <= 620 && (
        <div className='hamburger_wrapper'>
          <GiHamburgerMenu size={30} color='#FFF'onClick={() => setShowHamburgerNav(!showHamburgerNav)}/>
        </div>
      )}
      {(showHamburgerNav || width > 620) && (
        <div className='full-navigation'>
          <div className='links'>
            <div className='link_tag'>
              <Link to="/clubs">Clubs</Link>
            </div>
            <div className='link_tag'>
              <Link to="/videogames">Videogames</Link>
            </div>
          </div>
          <div className='right'>
            {!user && (
              <>
                <div className='btn'>
                  <Link to="/login">Log In</Link>
                </div>
                <div className='btn'>
                  <Link to="/signin">Sign In</Link>
                </div>
              </>
            )}
            {user && (
              <div className='profile_icon_wrapper'>
                <IoPersonCircle size={36} color='#F3FEF6' onClick={() => setShowProfileModal(!showProfileModal)}/>
              </div>
            )}

            {((showProfileModal || width <= 620) && user) &&(
              <div className="profileModal">
                <button className='profileModal__btn border-top' onClick={handleNavigateToProfile}>Profile</button>
                <button className='profileModal__btn border-bottom' onClick={handleSignOut}>Sign out</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Header