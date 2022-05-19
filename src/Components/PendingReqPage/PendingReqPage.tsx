import React, { useEffect } from 'react';
import './PendingReqPage.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { getAllPendingByUser } from '../../slices/ReimbursementSlice';

import { Navbar } from '../Navbar/Navbar';

// go inside App for routing
export const PendingReqPage: React.FC<any> = () => {
  const pendingInfo = useSelector(
    (state: RootState) => state.reimbursement.allPending
  );
  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllPendingByUser());
  }, []);

  return (
    <>
      <Navbar />
      <div className="pendingWrapper">
        <div className="userDetails">
          <p>{userInfo?.firstName}</p>
          <p>{userInfo?.role}</p>
        </div>
        <div className="pendingHeading">
          <h3>All Pending Requests</h3>
        </div>
        {pendingInfo?.map((info) => {
          return (
            <div className="pendingColumn" style={{ color: 'white' }}>
              <p>Amount: {info.amount}</p>
              <p>Description: {info.description}</p>
              <p>Status: {info.reimbursementStatus}</p>
              <p>Type: {info.reimbursementType}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
