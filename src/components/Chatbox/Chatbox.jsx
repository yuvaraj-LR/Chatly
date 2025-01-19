import React from 'react'
import assest from '../../assets/assets'

import "./Chatbox.css"

const Chatbox = () => {

  const chatData = [
    {
      sid: "me",
      rid: "you",
      msg: "Hi Yuvaraj! So, excited to connect with you.",
      timeStamp: "12:37 PM"
    },
    {
      sid: "me",
      rid: "you",
      msg: "Looking for a opportunity in your company.",
      timeStamp: "12:38 PM"
    },
    {
      sid: "you",
      rid: "me",
      msg: "Yes, We have few opportunities in Full-Stack Developer.",
      timeStamp: "12:38 PM"
    },
    {
      sid: "you",
      rid: "me",
      msg: "I will let my HR to connect with you.",
      timeStamp: "12:37 PM"
    },
  ]


  return (
    <div className="chatbox_container">
      <div className="chatbox_wrapper">
        <div className="chatbox_content">
          <div className="flex chatbox_head">
            <img src={assest.Women2} alt="profile_img" className='chat_profile' />
            <h2 className='chat_profile_name'>Amelia</h2>
          </div>

          <div className="chatbox_chats">
            <div className="chats_box_div">
              <div className="flex my_chat chatbox_chats">
                <p className="chat_text">Hello, Yuvaraj!Hello, Yuvaraj!Hello, Yuvaraj!Hello, Yuvaraj!Hello, Yuvaraj!Hello, Yuvaraj</p>
                <p className="time">12:52 PM</p>
              </div> 
            </div>
          </div>
        </div>

        <div className="chatbox_input_container">
          <form className='chatbox_form'>
            <input type="text" id='chat_mgs' placeholder='Send a message' className='chat_mgs' />

            <div className="chat_file">
              <label htmlFor="profile"><img src={assest.Gallery} alt="userIcon" className='chat_icon' /></label>
              <input
                id="profile"
                type="file"
                name="profile"
                className={`chat_file_input hidden`}
                required
              />
            </div>

            <img src={assest.SendButton} alt="send" className="chat_icon send_btn" />
          </form>
        </div>

      </div>
    </div>
  )
}

export default Chatbox