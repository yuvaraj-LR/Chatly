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
import { useAppContextHook } from "./context/AppContext";

function App() {

  const navigator = useNavigate();

  const { loadUserData } = useAppContextHook();

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        // Load the user data and chat information in context API.
        // await loadUserData()
        loadUserData(user.uid)
        
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
