import { BrowserRouter, Routes, Route } from "react-router"

import Chat from "./pages/chat/Chat"
import Profile from "./pages/profile/Profile"
import Signin from "./pages/login/signIn/Signin"
import Signup from "./pages/login/signup/Signup"
import AuthLayout from "./components/AuthLayout/AuthLayout"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<AuthLayout />}>
            <Route path="/login/signin" element={<Signin />} />
            <Route path="/login/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
