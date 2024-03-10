import React from 'react'
import UserProvider from './provider/UserProvider'
import Header from './components/Header/Header'
import SignIn from './pages/SignIn/SignIn'
import Login from './pages/LogIn/LogIn'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import CompleteSignIn from './pages/CompleteSignIn/CompleteSignIn'

function App() {
  return (
    <>
        <Header/>
        <div>
            <Routes>        
                <Route path="/"  element={<Home/>} />
                <Route path="/login"  element={<Login />}/>
                <Route path="/signin"  element={<SignIn/>}/>
                <Route path="/complete-signin"  element={<CompleteSignIn/>}/>
            </Routes>
        </div>
    </>
  )
}

export default App