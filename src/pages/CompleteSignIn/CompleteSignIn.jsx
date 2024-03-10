import './CompleteSignIn.css'
import React, { useEffect, useState } from 'react'
import { auth, db, googleProvider } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { completeUserInfo, getUserById, signInWithCredentials, signInWithGoogleProvider } from '../../controllers/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user';

function CompleteSignIn() {

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [favVideoGame, setFavVideoGame] = useState('')
  const [username, setUserName] = useState('')

  const navigate = useNavigate();
  const { user, setUser } = useUser();
  

  const handleCompleteSignIn = async() => {
    await completeUserInfo(user, name, lastName, favVideoGame, username)
    const fullUser = await getUserById(user.uid)
    if(fullUser){
      setUser(fullUser)
      navigate('/')
    }else{
      alert('Sign in couldnt be completed')
    }
  }

  return (
    <div className='signIn__container'>
      <div className='signIn__wrapper'>
        <p className='title'>Complete Info</p>
        <div className='field__wrapper'>
          <p className='label'>Name</p>
          <input placeholder='Jane' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='field__wrapper'>
          <p className='label'>Last Name</p>
          <input placeholder='Doe' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className='field__wrapper'>
          <p className='label'>Username</p>
          <input placeholder='janedoe123' value={username} onChange={(e) => setUserName(e.target.value)}/>
        </div>
        <div className='field__wrapper'>
          <p className='label'>Favorite Video Game</p>
          <input placeholder='Call of Duty' value={favVideoGame} onChange={(e) => setFavVideoGame(e.target.value)}/>
        </div>
        <button onClick={() => handleCompleteSignIn()} className='signIn__btn__fill'>Complete sign in</button>
      </div>
    </div>
  )
}

export default CompleteSignIn