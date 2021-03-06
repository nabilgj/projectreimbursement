import React, { useEffect } from 'react';
import './ViewAllPending.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { getAllPendingByUser } from '../../slices/ReimbursementSlice';

import { Navbar } from '../../Components/Navbar/Navbar';

// go inside App for routing
export const ViewAllPending: React.FC<any> = () => {
  const pendingInfo = useSelector(
    (state: RootState) => state.reimbursement.allPending
  );

  // let reversePending = pendingInfo?.reverse();
  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {}, [pendingInfo]);

  return (
    <>
      <Navbar />
      <div className="pendingWrapper">
        <div className="userDetails">
          <p>{userInfo?.role}</p>
          <p>{userInfo?.firstName}</p>
        </div>
        <div className="pendingHeader">
          <h3>All Pending Requests</h3>
        </div>
        {pendingInfo?.map((info) => {
          return (
            <div
              key={info.id}
              className="pendingColumn"
              style={{ color: 'white' }}
            >
              {/* <h3>{info.reimbursementStatus}</h3> */}
              <p>Amount: {info.amount}</p>
              <p>Description: {info.description}</p>
              <p>Type: {info.reimbursementType}</p>
            </div>
          );
        })}

        <div className="accountButtons">
          <Link to="/home">
            <button>back</button>
          </Link>

          <Link to="/approvedeny">
            <button>Resolve</button>
          </Link>
        </div>
      </div>
    </>
  );
};
