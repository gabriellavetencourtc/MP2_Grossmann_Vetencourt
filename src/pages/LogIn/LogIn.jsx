import './LogIn.css'
import React, { useEffect, useState } from 'react'
import { logInWithCredentials, logOutUser, signInWithGoogleProvider } from '../../controllers/auth'
import {useUser} from '../../context/user'
import { useNavigate } from "react-router-dom";



function Login() {

  const {user, setUser} = useUser();

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogIn = async() => {
    const loggedUser = await logInWithCredentials(email, password)
    if(loggedUser){
      navigate('/')
    }else{
      console.log('login failed')
    }
  }
  const signInWithGoogle = async() => {
    const user = await signInWithGoogleProvider();
    if(user){
      navigate('/complete-signin')
    }else{
      console.log('error loging in with google')
    }
  }

  const handleLogOut = async () => {
    await logOutUser()
  }
  return (
    <div className='signIn__container'>
      <div className='signIn__wrapper'>
        <p className='title'>Log In</p>
        <div className='field__wrapper'>
          <p className='label'>Email</p>
          <input placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='field__wrapper'>
          <p className='label'>Password</p>
          <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button onClick={() => handleLogIn()} className='signIn__btn__fill'>Log In</button>
        <button onClick={() => signInWithGoogle()} className='signIn__btn__border'>Log In with Google</button>
        {
          user && user.email && (
            <button onClick={() => handleLogOut()} className='signIn__btn__border'>Logout</button>
          )
        }
        
      </div>
    </div>
  )
}

export default Login