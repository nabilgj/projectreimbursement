import React, { useEffect } from 'react';
import './LoginPage.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../../Components/LoginForm/LoginForm';

import { ToastContainer, toast } from 'react-toastify';

import { Spinner } from '../../Components/Spinner/Spinner';

// will go inside App tsx
export const LoginPage: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const navigator = useNavigate();

  useEffect(() => {
    if (!userState.error && userState.user) {
      navigator('/home');
    }
  }, [userState, userState.error]);

  return (
    // <div className="loginPage">
    //   {userState.error ? (
    //     <h2 className="loginError">Username or password is incorrect</h2>

    //     <ToastContainer
    //       position="top-center"
    //       autoClose={3000}
    //       hideProgressBar={false}
    //       newestOnTop={false}
    //       closeOnClick
    //       rtl={false}
    //       pauseOnFocusLoss
    //       draggable
    //       pauseOnHover
    //       theme="dark"
    //       progressStyle={{ color: '#23ce6b' }}
    //     />
    //   ) : null}

    //   <LoginForm spinner={userState.loading} error={userState.error} />
    // </div>

    <div className="loginPage">
      {userState.error ? (
        <h2 className="loginError">Username or password is incorrect</h2>
      ) : null}

      <LoginForm spinner={userState.loading} />
    </div>
  );
};
