import React, { useEffect } from 'react';
import './ViewApproveDeny.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';

import { Navbar } from '../../Components/Navbar/Navbar';

import { getAllPending } from '../../slices/ManagerSlice';

// go inside App for routing
export const ViewApproveDeny: React.FC<any> = () => {
  const pendingAll = useSelector(
    (state: RootState) => state.manager.pendingReimbursements
  );

  console.log('coming from ViewApproveDeny line 19 ', pendingAll);

  // let reversePending = pendingInfo?.reverse();
  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllPending());
  // }, []);

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

        {pendingAll?.map((pendingA) => {
          return (
            <div
              key={pendingA.id}
              className="pendingColumn"
              style={{ color: 'white' }}
            >
              <p>Amount: {pendingA.amount}</p>
              <p>Description: {pendingA.description}</p>
              <p>Statu: {pendingA.reimbursementStatus}</p>
              <p>Type: {pendingA.reimbursementType}</p>
            </div>
          );
        })}

        <div className="accountButtons">
          <Link to="/home">
            <button>Approve</button>
          </Link>

          <Link to="/home">
            <button>Deny</button>
          </Link>
        </div>
      </div>
    </>
  );
};
