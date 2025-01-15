import React, { useState } from 'react';
import "./Profile.css";
import assest from '../../assets/assets';

const Profile = () => {

  return (
    <div className="profile_wrapper">
      <div className="layout">
      </div>
      <div className="flex profile_container">
        <section className="signin-container">
          <div className="signin-card">
            <h1 className="heading">Profile Details</h1>
            <form className="signin-form">
              <div className="form-group profile_grp">
                <label htmlFor="profile"><img src={assest.UserIcon} alt="userIcon" /><p className='profile_desc'>Upload your Profile Photo</p></label>
                <input
                  id="profile"
                  type="file"
                  name="profile"
                  className={`form-input hidden`}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className={`form-input`}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="about">About</label>

                <textarea className='form-input' id='about' name='about' placeholder='Your about' rows="4" cols="55">
                </textarea>
              </div>
              <button type="submit" className="submit-btn">Save</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
