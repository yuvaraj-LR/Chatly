import React, { useState } from 'react';
import './Signin.css'; 
import assest from '../../../assets/assets';
import { signIn } from '../../../config/firebase';

const Signin = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    signIn(data.get('email'), data.get('password'));

  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <section className="signin-container">
      <div className="signin-card">
        <img src={assest.Logo} alt="Logo" className="logo" />
        <h1 className="heading">Sign in</h1>
        <form className="signin-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              className={`form-input ${emailError ? 'input-error' : ''}`}
              required
            />
            {emailError && <span className="error-message">{emailErrorMessage}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••"
              className={`form-input ${passwordError ? 'input-error' : ''}`}
              required
            />
            {passwordError && <span className="error-message">{passwordErrorMessage}</span>}
          </div>
          
          <button type="submit" className="submit-btn">Sign in</button>
        </form>

        <span className="divider">(or)</span>

        <div className="social-buttons">
          <button className="social-btn">
            <img src={assest.Google} alt="google" className="social-icon" />
            Sign in with Google
          </button>
          <button className="social-btn">
            <img src={assest.Facebook} alt="facebook" className="social-icon" />
            Sign in with Facebook
          </button>
        </div>
        <p className="signup-text">
          Don&apos;t have an account? <a href="/login/signup">Sign up</a>
        </p>
      </div>
    </section>
  );
};

export default Signin;
