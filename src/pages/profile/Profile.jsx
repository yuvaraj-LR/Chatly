import React, { useState } from 'react';
import "./Profile.css";
import assest from '../../assets/assets';
import { useAppContextHook } from '../../context/AppContext';

const Profile = () => {

  const { userData, handleProfileSubmit } = useAppContextHook();
  const { id, avatar, name, bio } = userData;

  const [avatarState, setAvatarState] = useState(avatar);
  const [nameState, setNameState] = useState(name);
  const [bioState, setBioState] = useState(bio);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfileSubmit(id, avatarState, nameState, bioState);
  }

  return (
    <div className="profile_wrapper">
      <div className="layout">
      </div>
      <div className="flex profile_container">
        <section className="signin-container">
          <div className="signin-card">
            <h1 className="heading">Profile Details</h1>

            <img src={avatarState ? avatarState : assest.UserIcon } alt="userIcon" className='profile_img' />

            <form className="signin-form" onSubmit={handleSubmit}>
              {/* <div className="form-group profile_grp">
                <label htmlFor="profile"><img src={assest.UserIcon} alt="userIcon" /><p className='profile_desc'>Upload your Profile Photo</p></label>
                <input
                  id="profile"
                  type="file"
                  name="profile"
                  className={`form-input hidden`}
                  required
                />
              </div> */}

              <div className="form-group">
                <label htmlFor="profile">Profile URL</label>
                <input id="profile" type="text" name="profile" placeholder="Profile Link" className={`form-input`} required value={avatarState} onInput={(e) => setAvatarState(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" placeholder="Your Name" className={`form-input`} required value={nameState} onInput={(e) => setNameState(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="about">About</label>

                <textarea className='form-input' id='about' name='about' placeholder='Your about' rows="4" cols="55" value={bioState} onInput={(e) => setBioState(e.target.value)}>
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
