import React, { useEffect } from 'react';
import './ViewAllEmployyes.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { getAllPendingByUser } from '../../slices/ReimbursementSlice';

import { Navbar } from '../../Components/Navbar/Navbar';

// go inside App for routing
export const ViewAllEmployyes: React.FC<any> = () => {
  const usersAll = useSelector((state: RootState) => state.manager.allUsers);

  // let reversePending = pendingInfo?.reverse();
  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div className="pendingWrapper">
        <div className="userDetails">
          <p>{userInfo?.role}</p>
          <p>{userInfo?.firstName}</p>
        </div>
        <div className="pendingHeader">
          <h3>All Employees</h3>
        </div>

        {/* <div key={info.id} className="pendingColumn" style={{ color: 'white' }}>
          <p>Amount: {allUsers?.map}</p>
          <p>Description: {info.description}</p>
          <p>Type: {info.reimbursementType}</p>
        </div> */}

        {usersAll?.map((user) => {
          return (
            <div
              key={user.user_id}
              className="pendingColumn"
              style={{ color: 'white' }}
            >
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          );
        })}

        <div className="accountButtons">
          <Link to="/home">
            <button>back</button>
          </Link>

          {/* <Link to="/approvedeny">
            <button>Resolve</button>
          </Link> */}
        </div>
      </div>
    </>
  );
};
