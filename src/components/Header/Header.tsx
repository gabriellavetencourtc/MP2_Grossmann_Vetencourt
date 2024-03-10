import React from 'react'
import './Header.css'
import { CgProfile } from "react-icons/cg";

function Header() {
  return (
    <div className='header__container'>
      <div className='header__left'>
        <p>MP2</p>
      </div>
      <div className='right'>
        <CgProfile size={20}/>
      </div>
    </div>
  )
}

export default Header