import React, { useEffect, useState } from 'react'
import FadeLoader from "react-spinners/FadeLoader";

import { useNavigate } from 'react-router';

import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Chatbox from '../../components/Chatbox/Chatbox'

import "./Chat.css"
import { useAppContextHook } from '../../context/AppContext';

const Chat = () => {
  const navigator = useNavigate();

  const {userData, chatData} = useAppContextHook();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  }, [userData, chatData])

  return (
    <div className='chat_container'>
      {
        loader ?
          <span className='spinner'>
            <FadeLoader
              color="#1C274C"
              size="150"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </span>
        :
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
      }
    </div>
  )
}

export default Chat