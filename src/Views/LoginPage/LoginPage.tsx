import React from 'react';

import './LoginPage.css';
import { LoginForm } from '../../Components/LoginForm/LoginForm';

// will go inside App tsx
export const LoginPage: React.FC = () => {
  return (
    <div className="loginPage">
      <LoginForm />
    </div>
  );
};
