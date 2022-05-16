import React, { useEffect } from 'react';
import './LoginPage.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../Components/LoginForm/LoginForm';
import { Spinner } from '../../Components/Spinner/Spinner';

// will go inside App tsx
export const LoginPage: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const navigator = useNavigate();

  useEffect(() => {
    if (!userState.error && userState.user) {
      navigator('/home');
    }
  }, [userState]);

  return (
    <div className="loginPage">
      {userState.error ? (
        <h2 className="loginError">Username or password is incorrect</h2>
      ) : null}

      <LoginForm spinner={userState.loading} />
    </div>
  );
};
