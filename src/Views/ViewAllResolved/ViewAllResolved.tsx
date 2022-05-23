import React, { useEffect } from 'react';
import './ViewAllResolved.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { getAllPendingByUser } from '../../slices/ReimbursementSlice';

import { Navbar } from '../../Components/Navbar/Navbar';

// go inside App for routing
export const ViewAllResolved: React.FC<any> = () => {
  const resolveRequest = useSelector(
    (state: RootState) => state.manager.requestResolve
  );

  // let reversePending = pendingInfo?.reverse();
  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div className="allResolvedWrapper">
        <div className="allResolvedDetails">
          <p>{userInfo?.role}</p>
          <p>{userInfo?.firstName}</p>
        </div>
        <div className="allResolvedHeader">
          <h3>All Resolved Requests</h3>
        </div>
        {resolveRequest?.map((info) => {
          return (
            <div
              key={info.id}
              className="allResolvedColumn"
              style={{ color: 'white' }}
            >
              {/* <h3>{info.reimbursementStatus}</h3> */}
              <p>Author Id: {info.reimbursementAuthorId}</p>
              <p>Amount: ${info.amount}</p>
              <p>Description: {info.description}</p>
              <p>Type: {info.reimbursementType}</p>
              <p>Status: {info.reimbursementStatus}</p>
            </div>
          );
        })}

        <div className="allResolvedButtons">
          <Link to="/home">
            <button>back</button>
          </Link>
        </div>
      </div>
    </>
  );
};
