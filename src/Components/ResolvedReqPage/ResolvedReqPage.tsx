import React, { useEffect } from 'react';
import './ResolvedReqPage.css';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { getAllResolvedByUser } from '../../slices/ReimbursementSlice';

import { Navbar } from '../Navbar/Navbar';

// go inside App for routing
export const ResolvedReqPage: React.FC<any> = () => {
  const resolvedInfo = useSelector(
    (state: RootState) => state.reimbursement.allResolved
  );
  const userInfo = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllPendingByUser());
  }, []);

  return (
    <>
      <Navbar />
      <div className="resolvedWrapper">
        <div className="resolvedDetails">
          <p>{userInfo?.role}</p>
          <p>{userInfo?.firstName}</p>
        </div>

        {/* <div className="resolvedHeader">
          <h3>All Resolved Requests</h3>
        </div> */}

        {resolvedInfo?.length! <= 0 ? (
          <h3 className="resolvedHeader">Nope! no request resolved.</h3>
        ) : (
          resolvedInfo?.map((info) => {
            return (
              <div
                key={info.id}
                className="resolvedColumn"
                style={{ color: 'white' }}
              >
                <h3 className="resolvedHThree">{info.reimbursementStatus}</h3>
                <p>Amount: ${info.amount}</p>
                <p>Description: {info.description}</p>
                <p>Type: {info.reimbursementType}</p>
              </div>
            );
          })
        )}

        <div className="resolvedButtons">
          <Link to="/home">
            <button>Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};
