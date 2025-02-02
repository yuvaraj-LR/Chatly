import { BrowserRouter, Routes, Route, useNavigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.css"

import Chat from "./pages/chat/Chat"
import Profile from "./pages/profile/Profile"
import Signin from "./pages/login/signIn/Signin"
import Signup from "./pages/login/signup/Signup"
import AuthLayout from "./components/AuthLayout/AuthLayout"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {

  const navigator = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      console.log(user, "userr...");

      if(user) {
        // Load the user data and chat information in context API.
        navigator("/")
        
      } else {
        navigator("/login/signin")
      }
    })
  }, [])

  return (
    <>
      <ToastContainer />
        <Routes>
          <Route index element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<AuthLayout />}>
            <Route path="/login/signin" element={<Signin />} />
            <Route path="/login/signup" element={<Signup />} />
          </Route>
        </Routes>
    </>
  )
}

export default App
