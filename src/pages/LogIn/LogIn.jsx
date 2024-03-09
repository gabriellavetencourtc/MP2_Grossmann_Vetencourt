import './LogIn.css'
import React, { useEffect, useState } from 'react'
import { logInWithCredentials, logInWithGoogleProvider, logout } from '../../controllers/auth'
import {useUser} from '../../context/user'
import { useNavigate } from "react-router-dom";



function Login() {

  const user = useUser();

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if(user){
      console.log('LOGIN HAS USER INFO')
    }else{
      console.log('LOGIN DOESNT HAVE USER INFO')
    }
  }, [user])
  

  const handleLogIn = async() => {
    const user = await logInWithCredentials(email, password)
    if(user){
      navigate('/')
    }else{
      alert('login failed')
    }
  }
  const signInWithGoogle = async() => {
    await logInWithGoogleProvider();
  }

  const handleLogOut = async () => {
    await logout()
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