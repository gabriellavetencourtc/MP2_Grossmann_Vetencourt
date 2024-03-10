import React, { useState } from 'react'
import './Header.css'
import { CgProfile } from "react-icons/cg";

import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user';
import { logOutUser } from '../../controllers/auth';

function Header() {

  const { user } = useUser()

  const navigate = useNavigate()

  const [showProfileModal, setShowProfileModal] = useState(false)

  const handleNavigateToProfile = () => {
    // navigate('profile', {replace: true});
    setShowProfileModal(false)
  }

  const handleSignOut = async() => {
    setShowProfileModal(false)
    await logOutUser()
  }

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
          <CgProfile size={36} color='#F3FEF6' onClick={() => setShowProfileModal(!showProfileModal)}/>
        )}

        {showProfileModal && (
          <div className="profileModal">
            <button className='profileModal__btn border-top' onClick={handleNavigateToProfile}>Profile</button>
            <button className='profileModal__btn border-bottom' onClick={handleSignOut}>Sign out</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header