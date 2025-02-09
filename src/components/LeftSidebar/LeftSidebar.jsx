import React from 'react'
import { Link } from "react-router";
import { useState } from 'react';
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

import assest from '../../assets/assets';

import "./LeftSidebar.css";
import { db, logout } from '../../config/firebase';
import { useAppContextHook } from '../../context/AppContext';

const LeftSidebar = () => {
  const { userData, chatData } = useAppContextHook();

  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const inputValue = e.target.value;
      
      if (inputValue) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", inputValue.toLowerCase()));
        const querySnap = await getDocs(q);

        const queryData = querySnap?.docs[0]?.data();

        if (!querySnap.empty && queryData?.id !== userData.id) {
          let userExists = false;

          chatData ? chatData.map((user) => {
            if(user.rId == queryData?.id) {
              userExists = true;
            }
          }) : "";

          if(!userExists) {
            setUser(queryData);
          }
        } else {
          setUser(null);
          console.log("No user found.");
        }
      } else {
        setShowSearch(false);
      }

    } catch (error) {
      console.log(error, "input error");
      toast.error(error.message);
    }
  }

  const addChat = async () => {
    if (!user || !user.id) return;
  
    const chatRef = doc(db, "chats", userData.id);
    const userChatRef = doc(db, "chats", user.id);
    
    try {
      // Fetch existing chat data
      const chatSnap = await getDoc(chatRef);
      const existingChatData = chatSnap.exists() ? chatSnap.data().chatData : [];
  
      // Check if chat already exists
      const chatExists = existingChatData.some((chat) => chat.rId === user.id);
  
      if (!chatExists) {
        // Create a new message reference
        const messageRef = doc(collection(db, "message"));
        await setDoc(messageRef, {
          createdAt: serverTimestamp(),
          messages: []
        });
  
        const newChatEntry = {
          messageId: messageRef.id,
          lastseen: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true
        };
  
        // Update both users' chat documents
        await updateDoc(chatRef, {
          chatData: arrayUnion(newChatEntry)
        });
  
        await updateDoc(userChatRef, {
          chatData: arrayUnion({
            ...newChatEntry,
            rId: userData.id // Reverse mapping for the other user
          })
        });
  
        toast.success("Chat added successfully!");
      } else {
        toast.info("Chat already exists!");
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error.message);
    }
  };
  
  const loadUserChat = async (item) => {
    console.log(item, "itemmm....");
    
  };

  return (
    <div className='leftSidebar_container'>
      <div className="flex flex_space_between leftSidebar_title">
        <img src={assest.Logo} alt="logo" className='chat_logo'/>

        <span className="menu_div">
          <img src={assest.HamburgerMenu} alt="hamburgerMenu" className='menu' id='menu' onClick={() => setMenu(!menu)} />

          <div className={menu ? "menu_list" : "hidden"}>
            <Link to="/profile">
              <p className="menu_option">
                  Edit Profile
              </p>
            </Link>
            <p className="menu_option" onClick={logout}>Logout</p>
          </div>
        </span>
      </div>

      <div className="search">
        <input type="text" name='search' id='search' placeholder='Search Username...' className='search_inp' onChange={(e) => inputHandler(e)} />

        <img src={assest.Search} alt="search" className='menu' />
      </div>

      <div className="chat_box">
        {
        showSearch && user ?
          <div className="flex chat" onClick={addChat}>
            <img src={user.avatar} alt="user-img" className="user_img" />
            <p>{user.name}</p>
          </div>
        :
          chatData?.map((listUser, i) => (
            <div className="flex chat" key={i} onClick={() => loadUserChat(listUser)}>
              <img src={listUser.avatar} alt="user-img" className="user_img" />
              <p>{listUser.name}</p>
              <span>{listUser.lastMessage}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LeftSidebar