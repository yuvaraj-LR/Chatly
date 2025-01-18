import React, { useState } from 'react'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Chatbox from '../../components/Chatbox/Chatbox'

import "./Chat.css"

const Chat = () => {
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