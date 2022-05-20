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
  const pendingAllInfo = useSelector(
    (state: RootState) => state.manager.reimbursement
  );

  console.log('coming from ViewApproveDeny line 19 ', pendingAllInfo);

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
        {/* {ViewApproveDeny} */}
        {/* {ViewApproveDeny?.map((info) => {
          return (
            <div
              key={info.id}
              className="pendingColumn"
              style={{ color: 'white' }}
            >

              <p>Amount: {info.amount}</p>
              <p>Description: {info.description}</p>
              <p>Type: {info.reimbursementType}</p>
            </div>
          );
        })} */}

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
