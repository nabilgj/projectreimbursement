import React, { useState } from 'react';
import './LoginForm.css';

import { useDispatch } from 'react-redux';
import { toggleError, loginUser } from '../../slices/UserSlice';
import { AppDispatch } from '../../store';

// will go inside
export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();

  // input change handler
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  // form submit handler
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    let credentials = {
      emailOrUsername: email,
      password: password,
    };

    dispatch(loginUser(credentials));
  };

  return (
    <div className="login">
      {/* text container */}
      <div className="textContainer">
        <h1 className="loginHeader">Welcome to Reimbursements</h1>
        {/* <h2 className="login-header">Sign in to view your reimbursements</h2> */}
      </div>

      <form className="loginForm">
        {/* for email */}
        <div className="inputDiv">
          <h4 className="inputH4">Your Email</h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="text"
            name="email"
            placeholder="email"
            onChange={handleInput}
          />
        </div>

        {/* for password */}
        <div className="inputDiv">
          <h4 className="inputH4">Your Password</h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInput}
          />
        </div>
      </form>

      <button className="loginButton" onClick={handleLogin}>
        {' '}
        Login{' '}
      </button>
    </div>
  );
};
