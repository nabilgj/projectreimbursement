import React, { useEffect } from 'react';
import './ReimbursementPage.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { Navbar } from '../../Components/Navbar/Navbar';

// go inside App for Route
export const ReimbursementPage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);

  // useEffect(() => {
  //   userInfo.error;
  // }, []);

  return (
    <>
      <Navbar />
      <h1 className="reimburse">Welcome: {userInfo.user?.firstName}</h1>
      <h2 className="reimburse">Reimbursements</h2>
    </>
  );
};
