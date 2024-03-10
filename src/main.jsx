import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
//User Provider
import UserProvider from './provider/UserProvider.jsx'
// Router
import {
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { router } from './router.jsx'
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)
