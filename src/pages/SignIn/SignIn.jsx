import './SignIn.css'
import React, { useState } from 'react'
import { auth, db, googleProvider } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { collection, doc, setDoc } from "firebase/firestore"; 
import { logout, signInWithCredentials, signInWithGoogleProvider } from '../../controllers/auth';
import { useNavigate } from 'react-router-dom';

function SignIn() {

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [favVideoGame, setFavVideoGame] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const signIn = async() => {
    const user = await signInWithCredentials(email, password, name, lastName, favVideoGame, username)
    if(user){
      navigate('/')
    }else{
      alert('Sign in couldnt be completed')
    }
  }
  const signInWithGoogle = async() => {
    await signInWithGoogleProvider();
  }
  const logOut = async () => {
    await logout();
  }

  return (
    <div className='signIn__container'>
      <div className='signIn__wrapper'>
        <p className='title'>Sign In</p>
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
        <div className='field__wrapper'>
          <p className='label'>Email</p>
          <input placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='field__wrapper'>
          <p className='label'>Password</p>
          <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button onClick={() => signIn()} className='signIn__btn__fill'>Sign In</button>
        <button onClick={() => signInWithGoogle()} className='signIn__btn__border'>Sign In with Google</button>
        {
          auth?.currentUser?.email && (
            <button onClick={() => logOut()} className='signIn__btn__border'>Logout</button>
          )
        }
        
      </div>
    </div>
  )
}

export default SignIn