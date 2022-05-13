import React, { useState } from 'react';
import './LoginForm.css';

// will go inside
export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    console.log('login user', {
      email,
      password,
    });
  };

  return (
    <div className="login">
      {/* text container */}
      <div className="text-container">
        <h1 className="login-header">Welcome to Reimbursements</h1>

        {/* <h2 className="login-header">Sign in to view your reimbursements</h2> */}
      </div>

      <form className="login-form">
        {/* for email */}
        <div className="input-div">
          <h4 className="input-h4">Your Email</h4>

          <input
            autoComplete="off"
            className="login-input"
            type="text"
            name="email"
            placeholder="email"
            onChange={handleInput}
          />
        </div>

        {/* for password */}
        <div className="input-div">
          <h4 className="input-h4">Your Password</h4>

          <input
            autoComplete="off"
            className="login-input"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInput}
          />
        </div>
      </form>

      <button className="login-button" onClick={handleLogin}>
        {' '}
        Login{' '}
      </button>
    </div>
  );
};
