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
      <h1> Your Resolved Requests </h1>
      <div style={{ color: 'white' }}>
        <ul>
          {resolvedInfo?.map((info) => {
            return <li key={info.id}> Description: {info.description}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
