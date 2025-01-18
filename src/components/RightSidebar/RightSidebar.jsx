import React from 'react'
import assest from '../../assets/assets'

import "./RightSidebar.css"

const RightSidebar = () => {

  const profileDesp = {
    profile_img: assest.Women2,
    profile_head: "Amelia",
    profile_desp: "Hey, There i am using chat app"
  }

  const mediaList = [
    assest.Women1,
    assest.Women2,
    assest.Men1,
    assest.Men2,
  ]

  return (
    <div className="rightSiebar_container">
      <div className="profile_data">
        <div className="profile_description">
          <img src={profileDesp.profile_img} alt="Profile Image" className="profile_img" />
          <h1 className="profile_name">{profileDesp.profile_head}</h1>
          <p className="profile_desp">{profileDesp.profile_desp}</p>
        </div>
        <div className="profile_media">
          <p className='media'>Media</p>

          <div className="media_container">
            {
              mediaList.map((mediaList, i) => (
                <img src={mediaList} alt="media-img" key={i} className="media_img" />
              ))
            }
          </div>
        </div>
      </div>
    
      <button className="logout_btn">
        <img src={assest.Logout} alt="logout" className='logout' />
        Logout
      </button>
    </div>    
  )
}

export default RightSidebar