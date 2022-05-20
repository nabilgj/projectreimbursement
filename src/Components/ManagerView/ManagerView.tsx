import React, { useEffect } from 'react';
import './ManagerView.css';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { getAllPending, getAllUsers } from '../../slices/ManagerSlice';

// go inside HomePage
export const ManagerView: React.FC<any> = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  // click handler for approve deny
  const handleViewAllEmployees = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(getAllUsers());
    console.log('coming handleApproveDeny click button');
    navigator('/allemployees');
  };

  // click handler for approve deny
  const handleAllPending = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getAllPending());
    console.log('coming handleApproveDeny click button');
    navigator('/approvedeny');
  };

  // click handler for approve deny
  const handleApproveDeny = (event: React.MouseEvent<HTMLButtonElement>) => {
    // dispatch(getAllPending());
    console.log('coming handleApproveDeny click button');
    navigator('/approvedeny');
  };

  // useEffect(() => {
  //   const handleApproveDeny = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     dispatch(getAllPending());
  //     navigator('/approvedeny');
  //   };
  // }, []);

  return (
    <div className="managerWrapper">
      {/* 1st row */}
      <div className="row1">
        <div className="managerColumn">
          <h3 className="textHeader">All Employees</h3>
          <p className="textPara">You may view all employees </p>

          <Link to="/allemployees" style={{ textDecoration: 'none' }}>
            <button className="managerButton" onClick={handleViewAllEmployees}>
              {' '}
              View Employees{' '}
            </button>
          </Link>
        </div>

        <div className="AccountsColumn">
          <h3 className="textHeader">All Pending</h3>
          <p className="textPara">You may view all pending request </p>

          <Link to="/approvedeny" style={{ textDecoration: 'none' }}>
            <button className="managerButton" onClick={handleAllPending}>
              {' '}
              View Pending{' '}
            </button>
          </Link>
        </div>
      </div>

      {/* 2nd row */}
      <div className="row2">
        <div className="managerColumn">
          <h3 className="textHeader">All Resolved</h3>
          <p className="textPara">You may view all resolved request </p>

          <Link to="/allresolved" style={{ textDecoration: 'none' }}>
            <button className="managerButton"> View Resolved </button>
          </Link>
        </div>

        <div className="managerColumn">
          <h3 className="textHeader">All Denied</h3>
          <p className="textPara"> You may view all denied request </p>

          <Link to="/approvedeny" style={{ textDecoration: 'none' }}>
            <button className="managerButton"> View Denied</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
