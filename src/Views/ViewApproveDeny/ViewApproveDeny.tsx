import React, { useEffect, useState } from 'react';
import './ViewApproveDeny.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';

import { Navbar } from '../../Components/Navbar/Navbar';

import { getRequestResolved } from '../../slices/ManagerSlice';

// go inside App for routing
export const ViewApproveDeny: React.FC<any> = () => {
  // const [reimburseId, setReimburseId] = useState(1);

  const pendingAll = useSelector(
    (state: RootState) => state.manager.pendingReimbursements
  );
  console.log('coming from ViewApproveDeny line 20 ', pendingAll);

  const navigator = useNavigate();

  // let reversePending = pendingInfo?.reverse();
  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  const handleApproved = (id: number) => {
    let credentials = {
      reimbursementId: id,
      status: 2,
    };

    console.log('Approved');
    dispatch(getRequestResolved(credentials));
    navigator('/home');
  };

  const handleDenied = () => {
    console.log('denied');
  };

  useEffect(() => {}, [pendingAll]);

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
              <p>Amount: ${pendingA.amount}</p>
              <p>Description: {pendingA.description}</p>
              <p>Status: {pendingA.reimbursementStatus}</p>
              <p>Type: {pendingA.reimbursementType}</p>

              <div className="accountButtons">
                {/* <Link to="/home">

                </Link> */}

                <button onClick={() => handleApproved(pendingA.id!)}>
                  Approve
                </button>

                <Link to="/home">
                  <button onClick={handleDenied}>Deny</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
