import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import SignIn from './pages/SignIn/SignIn'
import Login from './pages/LogIn/LogIn'
import Home from './pages/Home/Home'
import CompleteSignIn from './pages/CompleteSignIn/CompleteSignIn'
import Videogames from './pages/Videogames/Videogames'
import Clubs from './pages/Clubs/Clubs'
import Profile from './pages/Profile/Profile'
import Club from './pages/Club/Club'

function App() {
  return (
    <>
        {/* Header */}
        <Header/>
        <Routes>       
            <Route path="/" element={<Navigate to="/clubs" />} /> 
            <Route  path="/clubs"  element={<Clubs/>} index={true}/>
            <Route path="/login"  element={<Login />}/>
            <Route path="/signin"  element={<SignIn/>}/>
            <Route path="/complete-signin"  element={<CompleteSignIn/>}/>
            <Route path="/videogames"  element={<Videogames/>}/>
            {/* <Route path="/clubs/:id"  element={<Club/>}/> */}
            <Route path="/profile"  element={<Profile/>}/>
        </Routes>
    </>
  )
}

export default App