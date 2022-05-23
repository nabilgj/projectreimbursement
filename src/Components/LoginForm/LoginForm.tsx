import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { toggleError, loginUser } from '../../slices/UserSlice';
import { AppDispatch } from '../../store';
import { Spinner } from '../Spinner/Spinner';

// will go inside LoginPage
export const LoginForm: React.FC<any> = (spinner: any) => {
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

    toast('Username/password incorrect', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(loginUser(credentials));
  };

  return (
    <div className="login">
      {/* text container */}
      <div className="textContainer">
        <h1 className="loginHeader">Revature Reimbursements</h1>
        {/* <h2 className="login-header">Sign in to view your reimbursements</h2> */}
      </div>

      <form className="loginForm">
        {/* for email */}
        <div className="inputDiv">
          <h4 className="inputH4">Email or Username</h4>

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
          <h4 className="inputH4">Password</h4>

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

      {/* {spinner ? (
        <button className="loginButton" onClick={handleLogin}>
          login
        </button>
      ) : (
        <Spinner />
      )} */}

      <button className="loginButton" onClick={handleLogin}>
        login
      </button>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        progressStyle={{ color: '#23ce6b' }}
      />
    </div>
  );
};
