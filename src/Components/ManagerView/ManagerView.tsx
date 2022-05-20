import React from 'react';
import './ManagerView.css';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  getAllPendingByUser,
  getAllResolvedByUser,
} from '../../slices/ReimbursementSlice';

// go inside HomePage
export const ManagerView: React.FC<any> = () => {
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
    <div className="managerWrapper">
      {/* 1st row */}
      <div className="row1">
        <div className="managerColumn">
          {/* <div className="blue-column">

          </div> */}

          <h3 className="textHeader">Manager</h3>
          <p className="textPara"> </p>

          {/* <Link to="/submitreimbursement" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton">Submit Request</button>
          </Link> */}
        </div>

        <div className="AccountsColumn">
          {/* <div className="green-column">

          </div> */}
          <h3 className="textHeader">Manager</h3>
          {/* <p className="textPara"> Click here to see your account</p>

          <Link to="/viewaccount" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton">View Account</button>
          </Link> */}
        </div>
      </div>

      {/* 2nd row */}
      <div className="row2">
        <div className="managerColumn">
          <h3 className="textHeader">Manager</h3>
          {/* <p className="textPara"> View your pending requests</p>

          <Link to="/pendingrequest" style={{ textDecoration: 'none' }}>
            <button className="reimburseButton" onClick={handleGetAllPending}>
              Pending Requests
            </button>
          </Link> */}
        </div>
        <div className="managerColumn">
          <h3 className="textHeader">Manager</h3>
          {/* <p className="textPara"> Lets check your request status</p>

          <Link to="/resolvedrequest" style={{ textDecoration: 'none' }}>
            <button className="managerButton" onClick={handleGetAllResolved}>
              See Status
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};
