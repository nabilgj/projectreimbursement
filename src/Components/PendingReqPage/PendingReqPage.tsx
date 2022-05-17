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

  console.log('coming from 20 i love java ', pendingInfo?.map);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllPendingByUser());
  }, []);

  // form submit handler
  // const handleGetAllPending = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   dispatch(getAllPendingByUser());
  // };

  return (
    <div className="some-page-wrapper">
      <Navbar />
      <h1> Your Pending Requests </h1>
      <div style={{ color: 'white' }}>
        <ul>
          {pendingInfo?.map((info) => {
            return <li key={info.id}> Description: {info.description}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
