import React, { useEffect } from 'react';
import './ViewIndividualEmployee.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { getAllPendingByUser } from '../../slices/ReimbursementSlice';

import { Navbar } from '../../Components/Navbar/Navbar';

import { useNavigate } from 'react-router-dom';

// go inside App for routing
export const ViewIndividualEmployee: React.FC<any> = () => {
  const emp = useSelector((state: RootState) => state.manager.indEmployee);

  // let reversePending = pendingInfo?.reverse();
  const userInfo = useSelector((state: RootState) => state.user.user);

  const navigator = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  // form submit handler
  const handleClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator('/home');
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

        {emp?.map((emp) => {
          return (
            <Link
              to={`/allemployees/${emp.id}`}
              className="employeeColumn"
              key={emp.id}
            >
              <div style={{ color: 'white' }}>
                <p>Amount {emp.amount}</p>
                <p>Description: {emp.description}</p>
                <p>Status: {emp.reimbursementStatus}</p>
                <p>Type: {emp.reimbursementType}</p>
                <p>Resolver: {emp.reimbursementResolverId}</p>
              </div>
            </Link>
          );
        })}

        <div className="employeeButtons">
          <Link to="/allemployees">
            <button>back</button>
          </Link>
        </div>
      </div>
    </>
  );
};
