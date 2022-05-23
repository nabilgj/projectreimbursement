import React, { useEffect, useState } from 'react';
import './ViewIndividualEmployee.css';

import { IReimbursement } from '../../interfaces/IReimbursement';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { getAllPendingByUser } from '../../slices/ReimbursementSlice';

import { Navbar } from '../../Components/Navbar/Navbar';

import { useNavigate } from 'react-router-dom';

// go inside App for routing
export const ViewIndividualEmployee: React.FC<any> = () => {
  const [userName, setUserName] = useState('');

  const employees = useSelector(
    (state: RootState) => state.manager.indEmployee
  );

  const queryParams = new URLSearchParams(window.location.search);

  // let reversePending = pendingInfo?.reverse();
  const userInfo = useSelector((state: RootState) => state.user.user);

  const navigator = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  // form submit handler
  const handleClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator('/home');
  };

  useEffect(() => {
    setUserName(queryParams.get('user')!);
  }, [userName]);

  return (
    <>
      <Navbar />
      <div className="employeeWrapper">
        <div className="employeeDetails">
          <p>{userInfo?.role}</p>
          <p>{userInfo?.firstName}</p>
        </div>

        <div>
          <h3 className="employeeHeader">
            {employees?.length! > 0 ? `${userName} Requests` : null}
          </h3>
        </div>

        {employees?.length! <= 0 ? (
          <h3 className="employeeHeader">
            {userName} has not submitted any reimbursement!
          </h3>
        ) : (
          employees?.map((emp) => {
            return (
              <Link
                to={`/allemployees/${emp.id}`}
                className="employeeColumn"
                key={emp.id}
              >
                <div style={{ color: 'white' }}>
                  <p>Amount ${emp.amount}</p>
                  <p>Description: {emp.description}</p>
                  <p>Status: {emp.reimbursementStatus}</p>
                  <p>Type: {emp.reimbursementType}</p>
                  <p>Resolver: {emp.reimbursementResolverId}</p>
                </div>
              </Link>
            );
          })
        )}
        {/* {emp?.map((emp) => {
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
        })} */}

        <div className="employeeButtons">
          <Link to="/allemployees">
            <button>back</button>
          </Link>
        </div>
      </div>
    </>
  );
};
