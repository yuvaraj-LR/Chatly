import React, { useEffect, useState } from 'react'
import assest from '../../assets/assets'

import "./Chatbox.css"
import { useAppContextHook } from '../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'

const Chatbox = () => {

  const chatsData = [
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

  const { userData, messageId, chatUser, messages, setMessages } = useAppContextHook();
  const [ input, setInput ] = useState("");

  useEffect(() => {
    if(messageId) {

      console.log(messageId, "iddd");

      const unSub = onSnapshot(doc(db, 'message', messageId), (res) => {
        console.log(res.data());
        setMessages(res.data().messages.reverse());
      })

      return () => {
        unSub();
      }
    }
  }, [messageId])

  const sendMessage = async() => {

    try {
      if(input && messageId) {
        await updateDoc(doc(db, "message", messageId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date()
          })
        })
  
        const userIds = [chatUser.rId, userData.id];
  
        userIds.forEach(async(id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);
  
          if(userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messageId);
  
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
  
            if(userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
  
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData
            })
          }
        })
      }
    } catch (error) {
      toast.error(error.message);
    }
    
  }

  return (
    <div className="chatbox_container">

      {!chatUser ?

        <div className="chatbox_empty">
          <img src={assest.Logo} alt="Logo" className='chatbox_logo' />
          <p>Chat anywhere, anytime</p>
        </div>
        :
        <div className="chatbox_wrapper">
          <div className="chatbox_content">
            <div className="flex chatbox_head">
              <img src={chatUser.avatar} alt="profile_img" className='chat_profile' />
              <h2 className='chat_profile_name'>{chatUser.name}</h2>

              <div className="lastseen_highlighter">
                <img src={assest.GreenDot} alt="GreenDot" className='green_dot' />
              </div>

            </div>

            <div className="chatbox_chats_container">
              <div className="chats_box_div">
                {chatsData.map((chat, i) => (
                  <div key={i} className={`flex ${chat.sid == "me" ? "my_chat" : "their_chat"} chatbox_chats`}>
                    <p className={`${chat.sid == "me" ? "my_chat_text" : "their_chat_text"}`}>{chat.msg}</p>
                    <p className="time">{chat.timeStamp}</p>
                  </div> 
                ))}
              </div>
            </div>
          </div>

          <div className="chatbox_input_container">
            <form className='chatbox_form'  >
              <input onChange={(e) => setInput(e.target.value)} value={input} type="text" id='chat_mgs' placeholder='Send a message' className='chat_mgs' />

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

              <img onClick={sendMessage} src={assest.SendButton} alt="send" className="chat_icon send_btn" />
            </form>
          </div>
        </div>
      }

    </div>
  )
}

export default Chatbox