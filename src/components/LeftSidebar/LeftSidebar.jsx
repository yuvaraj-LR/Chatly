import React from 'react'
import { Link } from "react-router";
import { useState } from 'react';

import assest from '../../assets/assets';

import "./LeftSidebar.css";

const LeftSidebar = () => {

  const [menu, setMenu] = useState(false)

  const dummyUserData = [
    {
      name: "Sophia",
      image: assest.Women1
    },
    {
      name: "Alex",
      image: assest.Men1
    }, 
    {
      name: "Amelia",
      image: assest.Women2
    },
    {
      name: "George",
      image: assest.Men2
    },
    {
      name: "Sophia",
      image: assest.Women1
    },
    {
      name: "Alex",
      image: assest.Men1
    }, 
    {
      name: "Amelia",
      image: assest.Women2
    },
    {
      name: "George",
      image: assest.Men2
    },
    {
      name: "Sophia",
      image: assest.Women1
    },
    {
      name: "Alex",
      image: assest.Men1
    }, 
    {
      name: "Amelia",
      image: assest.Women2
    },
    {
      name: "George",
      image: assest.Men2
    }
  ]

  return (
    <div className='leftSidebar_container'>
      <div className="flex flex_space_between leftSidebar_title">
        <img src={assest.Logo} alt="logo" className='chat_logo'/>

        <span class="menu_div">
          <img src={assest.HamburgerMenu} alt="hamburgerMenu" className='menu' id='menu' onClick={() => setMenu(!menu)} />

          <div className={menu ? "menu_list" : "hidden"}>
            <Link to="/profile">
              <p className="menu_option">
                  Edit Profile
              </p>
            </Link>
            <p className="menu_option">Logout</p>
          </div>
        </span>
      </div>

      <div className="search">
        <input type="text" name='search' id='search' placeholder='Search...' className='search_inp' />

        <img src={assest.Search} alt="search" className='menu' />
      </div>

      <div className="chat_box">
        {
          dummyUserData.map((user, i) => (
            <div className="flex chat" key={i}>
              <img src={user.image} alt="user-img" className="user_img" />
              <p>{user.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default LeftSidebar