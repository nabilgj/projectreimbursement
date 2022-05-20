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
          <h3 className="textHeader">Approve/Deny</h3>
          <p className="textPara">You may approve or deny any request </p>

          <Link to="/approvedeny" style={{ textDecoration: 'none' }}>
            <button className="managerButton"> Approve/Deny</button>
          </Link>
        </div>

        <div className="AccountsColumn">
          <h3 className="textHeader">All Pending</h3>
          <p className="textPara">You may view all pending request </p>

          <Link to="/viewpending" style={{ textDecoration: 'none' }}>
            <button className="managerButton"> View All Pending </button>
          </Link>
        </div>
      </div>

      {/* 2nd row */}
      <div className="row2">
        <div className="managerColumn">
          <h3 className="textHeader">All Resolved</h3>
          <p className="textPara">You may view all resolved request </p>

          <Link to="/allresolved" style={{ textDecoration: 'none' }}>
            <button className="managerButton"> View All Resolved </button>
          </Link>
        </div>

        <div className="managerColumn">
          <h3 className="textHeader">All Employees</h3>
          <p className="textPara">You may view all employees </p>

          <Link to="/allemployees" style={{ textDecoration: 'none' }}>
            <button className="managerButton"> View All Employees </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
