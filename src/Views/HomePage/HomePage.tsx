import React, { useEffect } from 'react';
import './HomePage.css';
import { IUser } from '../../interfaces/IUser';

import { getAllUsers } from '../../slices/ManagerSlice';
import { getAllResolved } from '../../slices/ReimbursementSlice';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';

import { Navbar } from '../../Components/Navbar/Navbar';
import { ReimbursementForm } from '../../Components/ReimbursementForm/ReimbursementForm';

// go inside App for Route
export const HomePage: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const managerInfo = useSelector((state: RootState) => state.manager);
  const reimburseInfo = useSelector((state: RootState) => state.reimbursement);
  const dispatch: AppDispatch = useDispatch();

  const navigator = useNavigate();

  // form submit handler
  const handleAllUsers = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getAllUsers());
  };

  // form submit handler
  const handleAllReimbursements = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // dispatch(getAllUsers());
  };

  useEffect(() => {
    if (!userInfo.user) {
      navigator('/login');
    }
    // dispatch(getAllResolved());
  }, [userInfo]);

  return (
    <>
      <Navbar />
      <h2 className="userInfo">Welcome {userInfo.user?.firstName} </h2>

      {/* {checkForContent} */}

      <div className="userSection">
        <div className="reimbursementSection">
          <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
            Create Reimbursement
          </h2>

          <ReimbursementForm />
        </div>

        <div className="reimbursementSection">
          <h2>All Reimbursement Submission</h2>
        </div>
      </div>
    </>
  );
};
