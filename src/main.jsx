import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//User Provider
import UserProvider from './provider/UserProvider.jsx'
// Router
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </UserProvider>
  </React.StrictMode>,
)
