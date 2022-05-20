import React from 'react';
import './EmployeeView.css';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  getAllPendingByUser,
  getAllResolvedByUser,
} from '../../slices/ReimbursementSlice';

// go inside HomePage
export const EmployeeView: React.FC<any> = () => {
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

          {/* <h3 className="textHeader">
            Did you travel or eat with client lately?
          </h3> */}
          <h3 className="textHeader"> Submit your reimbursement request!</h3>

          <Link to="/submitreimbursement" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton">Submit Request</button>
          </Link>
        </div>

        <div className="AccountsColumn">
          <h3 className="textHeader">Click here to see your account</h3>

          <Link to="/viewaccount" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton">View Account</button>
          </Link>
        </div>
      </div>

      {/* 2nd row */}
      <div className="row2">
        <div className="reimburseColumn">
          <h3 className="textHeader">View your pending requests</h3>

          <Link to="/pendingrequest" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton" onClick={handleGetAllPending}>
              Pending Requests
            </button>
          </Link>
        </div>
        <div className="reimburseColumn">
          {/* <div className="green-column">

          </div> */}

          <h3 className="textHeader">View your resolved requests</h3>

          <Link to="/resolvedrequest" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton" onClick={handleGetAllResolved}>
              Resolved Requests
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
