import React, { useEffect } from 'react';
import './ManagerView.css';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  getAllPending,
  getAllUsers,
  getAllResolved,
} from '../../slices/ManagerSlice';

// go inside HomePage
export const ManagerView: React.FC<any> = () => {
  const userInfo = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  // click handler for approve deny
  const handleViewAllEmployees = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(getAllUsers());
  };

  // click handler for approve deny
  const handleAllPending = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getAllPending());
  };

  // click handler for approve deny
  const handleAllResolved = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(getAllResolved());
  };

  // click handler for approve deny
  // const handleApproveDeny = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   // dispatch(getAllPending());
  //   navigator('/approvedeny');
  // };

  useEffect(() => {}, []);

  return (
    <div className="managerWrapper">
      {/* 1st row */}
      <div className="managerRow1">
        <div className="managerColumn">
          <h3 className="managerTextHeader">View All Revature Employees</h3>

          <Link to="/allemployees" style={{ textDecoration: 'none' }}>
            <button className="managerButton" onClick={handleViewAllEmployees}>
              {' '}
              View Employees{' '}
            </button>
          </Link>
        </div>

        <div className="managerColumn">
          <h3 className="managerTextHeader">View All Pending Requests</h3>

          <Link to="/approvedeny" style={{ textDecoration: 'none' }}>
            <button className="managerButton" onClick={handleAllPending}>
              {' '}
              View Pending{' '}
            </button>
          </Link>
        </div>
      </div>

      {/* 2nd row */}
      <div className="managerRow2">
        <div className="managerColumn">
          <h3 className="managerTextHeader">View All Resolved Requests</h3>

          <Link to="/allresolved" style={{ textDecoration: 'none' }}>
            <button className="managerButton" onClick={handleAllResolved}>
              {' '}
              View Resolved{' '}
            </button>
          </Link>
        </div>

        <div className="managerColumn">
          <h3 className="managerTextHeader">Promote An Employee</h3>

          <Link to="/approvedeny" style={{ textDecoration: 'none' }}>
            <button className="managerButton disabled" disabled={false}>
              {' '}
              Coming Soon{' '}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
