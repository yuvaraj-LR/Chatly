import React, { useEffect, useState } from 'react'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Chatbox from '../../components/Chatbox/Chatbox'

import { onAuthStateChanged } from "firebase/auth";

import "./Chat.css"
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router';

const Chat = () => {
  const navigator = useNavigate();

  // useEffect(()=>{
  //   onAuthStateChanged(auth, async(user) => {
  //     console.log(user, "userr...");

  //     if(user) {
  //       // Load the user data and chat information in context API.
        
  //     } else {
  //       navigator("/")
  //     }
  //   })
  // }, [])

  return (
    <div className='chat_container'>
      <div className="chat_wrapper">
        <div className="left_sidebar" id="left_sidebar">
          <LeftSidebar />
        </div>
        <div className="chat_bar" id="chat_bar">
          <Chatbox />
        </div>
        <div className="right_sidebar" id="right_sidebar">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default Chat