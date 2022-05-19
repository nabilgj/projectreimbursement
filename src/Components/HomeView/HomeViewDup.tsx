import React from 'react';
import './HomeViewDup.css';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  getAllPendingByUser,
  getAllResolvedByUser,
} from '../../slices/ReimbursementSlice';

// go inside HomePage
export const HomeViewDup: React.FC<any> = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  // form submit handler
  const handleGetAllPending = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getAllPendingByUser());
    navigator('/pendingrequest');
  };

  // form submit handler
  const handleGetAllResolved = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getAllResolvedByUser());
    // navigator('/resolvedrequest');
  };

  return (
    <div className="some-page-wrapper">
      {/* 1st row */}
      <div className="row1">
        <div className="reimburseColumn">
          {/* <div className="blue-column">

          </div> */}

          <h3 className="textHeader">
            Did you travel or eat with client lately?
          </h3>
          <p className="textPara"> Submit your reimbursement request today!</p>

          <Link to="/submitreimbursement" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton">Submit Request</button>
          </Link>
        </div>

        <div className="AccountsColumn">
          {/* <div className="green-column">

          </div> */}
          <h3 className="textHeader">Want to make changes to your account?</h3>
          <p className="textPara"> Click here to see your account</p>

          <Link to="/reimbursement" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton">View Account</button>
          </Link>
        </div>
      </div>

      {/* 2nd row */}
      <div className="row2">
        <div className="reimburseColumn">
          <h3 className="textHeader">Have you submitted reimbursement?</h3>
          <p className="textPara"> View your pending requests</p>

          <Link to="/pendingrequest" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton" onClick={handleGetAllPending}>
              Pending Requests
            </button>
          </Link>
        </div>
        <div className="reimburseColumn">
          {/* <div className="green-column">

          </div> */}

          <h3 className="textHeader">What do you think about your requests?</h3>
          <p className="textPara"> Lets check your request status</p>

          <Link to="/resolvedrequest" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton" onClick={handleGetAllResolved}>
              See Status
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
