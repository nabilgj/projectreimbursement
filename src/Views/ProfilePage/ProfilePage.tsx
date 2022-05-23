import React, { useEffect } from 'react';
import './ProfilePage.css';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../../store';

import { getUserDetailsForManager } from '../../slices/UserSlice';

import { Navbar } from '../../Components/Navbar/Navbar';
import { IReimbursement } from '../../interfaces/IReimbursement';
import { parse } from 'path';

// go inside App
export const ProfilePage: React.FC = () => {
  const { id } = useParams();

  const profile = useSelector((state: RootState) => state.user);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (id && !profile.currentProfile) {
      dispatch(getUserDetailsForManager(id));
    }
  }, [profile]);

  return (
    <div>
      <Navbar />

      <h1 className="reimburseProfile">
        Profile of {profile.currentProfile?.firstName}{' '}
        {profile.currentProfile?.lastName}
      </h1>

      {/* {profile.currentProfile?.reimbursements ? (
        <div>
          {profile.reimbursement.map((reimburse: IReimbursement) => {
            return (
              <div>
                <p>{reimburse.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>No Reimbursement</h1>
      )} */}
    </div>
  );
};
