import React, { useEffect } from 'react';
import './ManagerView.css';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  getAllPending,
  getAllUsers,
  getAllResolved,
} from '../../slices/ManagerSlice';

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
  const handleAllResolved = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getAllResolved());
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
          <h3 className="textHeader">View All Employees</h3>

          <Link to="/allemployees" style={{ textDecoration: 'none' }}>
            <button className="managerButton" onClick={handleViewAllEmployees}>
              {' '}
              View Employees{' '}
            </button>
          </Link>
        </div>

        <div className="managerColumn">
          <h3 className="textHeader">View All Pending Requests</h3>

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
          <h3 className="textHeader">View All Resolved Requests</h3>

          <Link to="/allresolved" style={{ textDecoration: 'none' }}>
            <button className="managerButton" onClick={handleAllResolved}>
              {' '}
              View Resolved{' '}
            </button>
          </Link>
        </div>

        <div className="managerColumn">
          <h3 className="textHeader">View Requests of a Specific Employee</h3>

          <Link to="/approvedeny" style={{ textDecoration: 'none' }}>
            <button className="managerButton"> View Requests </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
