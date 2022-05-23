import React, { useEffect } from 'react';
import './ViewAllEmployyes.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { getSingleEmployeeRequests } from '../../slices/ManagerSlice';

import { Navbar } from '../../Components/Navbar/Navbar';

import { useNavigate } from 'react-router-dom';

// go inside App for routing
export const ViewAllEmployyes: React.FC<any> = () => {
  const usersAll = useSelector((state: RootState) => state.manager.allUsers);

  // let reversePending = pendingInfo?.reverse();
  const userInfo = useSelector((state: RootState) => state.user.user);

  const navigator = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const handleGetIndividualEmployee = (id: number) => {
    dispatch(getSingleEmployeeRequests(id));
  };

  return (
    <>
      <Navbar />
      <div className="employeeWrapper">
        <div className="employeeDetails">
          <p>{userInfo?.role}</p>
          <p>{userInfo?.firstName}</p>
        </div>
        <div className="employeeHeader">
          <h3>All Employees</h3>
        </div>

        {usersAll?.map((user) => {
          return (
            <Link
              to={`/allemployees/${user.user_id}?user=${user.firstName}`}
              className="employeeColumn"
              key={user.user_id}
              onClick={() => handleGetIndividualEmployee(user?.user_id!)}
            >
              <div key={user.user_id} style={{ color: 'white' }}>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            </Link>
          );
        })}

        <div className="employeeButtons">
          <Link to="/home">
            <button>back</button>
          </Link>
        </div>
      </div>
    </>
  );
};
