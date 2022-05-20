import React, { useEffect } from 'react';
import './ViewAccount.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';

import { Navbar } from '../../Components/Navbar/Navbar';

// go inside App for routing
export const ViewAccount: React.FC<any> = () => {
  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  console.log('coming from view account line 19 ', userInfo);

  useEffect(() => {
    // dispatch(getAllPendingByUser());
  }, [userInfo]);

  return (
    <>
      <Navbar />
      <div className="pendingWrapper">
        <div className="userDetails">
          <p>{userInfo?.role}</p>
          <p>{userInfo?.username}</p>
        </div>
        <div className="pendingHeader">{/* <h3>User Information</h3> */}</div>
        <div className="pendingColumn" style={{ color: 'white' }}>
          <p>Username: {userInfo?.username}</p>
          <p>FirstName: {userInfo?.firstName}</p>
          <p>LastName: {userInfo?.lastName}</p>
          <p>Email: {userInfo?.email}</p>
          <p>Password: ***** </p>
        </div>

        <div className="accountButtons">
          <Link to="/home">
            <button>Back</button>
          </Link>

          <Link to={`/viewaccount/edit/${userInfo?.firstName}`}>
            <button>Edit</button>
          </Link>
        </div>
      </div>
    </>
  );
};
