import React, { useEffect, useState } from 'react';
import './ViewApproveDeny.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';

import { Navbar } from '../../Components/Navbar/Navbar';

import {
  getRequestResolved,
  getAllUsers,
  getAllPending,
} from '../../slices/ManagerSlice';

// go inside App for routing
export const ViewApproveDeny: React.FC<any> = () => {
  const pendingAll = useSelector(
    (state: RootState) => state.manager.pendingReimbursements
  );

  const usersAll = useSelector((state: RootState) => state.manager.allUsers);

  console.log('coming from line 25 ViewApproveDeny ', usersAll);
  console.log('coming from line 26 ViewApproveDeny ', pendingAll);

  // let authorId = usersAll?.find((id) => id ===  )

  const navigator = useNavigate();

  // let reversePending = pendingInfo?.reverse();
  const managerInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  const handleApproved = (id: number) => {
    let credentials = {
      reimbursementId: id,
      status: 2,
    };

    dispatch(getRequestResolved(credentials));

    navigator('/home');
  };

  const handleDenied = (id: number) => {
    let credentials = {
      reimbursementId: id,
      status: 3,
    };

    dispatch(getRequestResolved(credentials));
    navigator('/home');
  };

  // useEffect(() => {
  //   // dispatch(getAllUsers());
  // }, [pendingAll]);

  return (
    <>
      <Navbar />
      <div className="approveDenyWrapper">
        <div className="approveDenyDetails">
          <p>{managerInfo?.role}</p>
          <p>{managerInfo?.firstName}</p>
        </div>

        {pendingAll?.length! <= 0 ? (
          <h3 className="approveDenyHeader">No Pending Request</h3>
        ) : (
          pendingAll?.map((pendingA) => {
            return (
              <div
                key={pendingA.id}
                className="approveDenyColumn"
                style={{ color: 'white' }}
              >
                <p>AuthorId: {pendingA.reimbursementAuthorId}</p>
                <p>Amount: ${pendingA.amount}</p>
                <p>Description: {pendingA.description}</p>
                <p>Status: {pendingA.reimbursementStatus}</p>
                <p>Type: {pendingA.reimbursementType}</p>

                <div className="approveDenyButtons">
                  <button onClick={() => handleApproved(pendingA.id!)}>
                    Approve
                  </button>

                  <button onClick={() => handleDenied(pendingA.id!)}>
                    Deny
                  </button>
                </div>
              </div>
            );
          })
        )}

        <div className="employeeButtons">
          <Link to="/home">
            <button>back</button>
          </Link>
        </div>
      </div>
    </>
  );
};
