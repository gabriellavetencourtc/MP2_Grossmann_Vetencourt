import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import SignIn from './pages/SignIn/SignIn'
import Login from './pages/LogIn/LogIn'
import Home from './pages/Home/Home'
import CompleteSignIn from './pages/CompleteSignIn/CompleteSignIn'
import Videogames from './pages/Videogames/Videogames'

function App() {
  return (
    <>
        {/* Header */}
        <Header/>
        <Routes>        
            <Route path="/"  element={<Home/>} />
            <Route path="/login"  element={<Login />}/>
            <Route path="/signin"  element={<SignIn/>}/>
            <Route path="/complete-signin"  element={<CompleteSignIn/>}/>
            <Route path="/videogames"  element={<Videogames/>}/>
        </Routes>
    </>
  )
}

export default App