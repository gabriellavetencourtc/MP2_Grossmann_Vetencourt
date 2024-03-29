import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import Login from "./pages/LogIn/LogIn";
import CompleteSignIn from "./pages/CompleteSignIn/CompleteSignIn";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/complete-signin",
      element: <CompleteSignIn />,
    },
  ]);