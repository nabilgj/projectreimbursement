import React, { useEffect } from 'react';
import './LoginPage.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../Components/LoginForm/LoginForm';

// will go inside App tsx
export const LoginPage: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const navigator = useNavigate();

  useEffect(() => {
    console.log(`coming from LoginPage useEffect line 17`, userState);

    if (!userState.error && userState.user) {
      navigator('/reimburse');
    }
  }, [userState]);

  return (
    <div className="loginPage">
      {userState.error ? (
        <h2 className="loginError">Username or password is incorrect</h2>
      ) : null}

      <LoginForm />
    </div>
  );
};
