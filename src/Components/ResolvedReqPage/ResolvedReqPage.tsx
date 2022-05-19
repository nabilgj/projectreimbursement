import React, { useEffect } from 'react';
import './ResolvedReqPage.css';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { getAllResolvedByUser } from '../../slices/ReimbursementSlice';

import { Navbar } from '../Navbar/Navbar';

// go inside App for routing
export const ResolvedReqPage: React.FC<any> = () => {
  const resolvedInfo = useSelector(
    (state: RootState) => state.reimbursement.allResolved
  );
  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllPendingByUser());
  }, []);

  return (
    <>
      <Navbar />
      <div className="resolvedWrapper">
        <div className="userDetails">
          <p>{userInfo?.firstName}</p>
          <p>{userInfo?.role}</p>
        </div>
        <div className="resolvedHeader">
          <h3>All Resolved Requests</h3>
        </div>
        {resolvedInfo?.map((info) => {
          return (
            <div
              key={info.id}
              className="resolvedColumn"
              style={{ color: 'white' }}
            >
              <h3>{info.reimbursementStatus}</h3>
              <p>Amount: ${info.amount}</p>
              <p>Description: {info.description}</p>
              <p>Type: {info.reimbursementType}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
