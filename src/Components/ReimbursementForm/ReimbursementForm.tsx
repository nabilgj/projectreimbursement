import React, { useState, useEffect } from 'react';
import './ReimbursementForm.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllResolved,
  submitReimbursement,
} from '../../slices/ReimbursementSlice';
import { AppDispatch, RootState } from '../../store';

import { Spinner } from '../Spinner/Spinner';

// will go inside HomePage
export const ReimbursementForm: React.FC<any> = (spinner: any) => {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rType, setRType] = useState<string>('');

  const userInfo = useSelector((state: RootState) => state.user);
  const reimburseInfo = useSelector((state: RootState) => state.reimbursement);
  console.log('coming from ReimbursementForm line 20 ', userInfo);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log('coming from ReimbursementForm line 26 ', reimburseInfo);

    dispatch(getAllResolved());
  }, [reimburseInfo]);

  // input change handler
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'amount') {
      setAmount(event.target.value);
    } else if (event.target.name === 'description') {
      setDescription(event.target.value);
    } else if (event.target.name === 'rType') {
      setRType(event.target.value);
    }
  };

  // form submit handler
  const handleSubmitReimbursement = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    let today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    // let dd = today.getDate();
    // let mm = today.getMonth();
    // let yyyy = today.getFullYear();
    // today = mm + '/' + dd + '/' + yyyy;

    let credentials = {
      amount: parseInt(amount),
      submitted_date: today.toLocaleString(),
      description: description,
      reimbursement_author: userInfo.user?.userId,
      reimbursement_status_id: 1,
      reimbursementType: parseInt(rType),
    };
    console.log('coming from handleSubmitReimbursement line 37 ', credentials);

    dispatch(submitReimbursement(credentials));
  };

  return (
    <div className="reimburseForm">
      <form className="loginForm">
        {/* for email */}
        <div className="inputDiv">
          <h4 className="inputH4"> Amount </h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="number"
            name="amount"
            placeholder="amount"
            onChange={handleInput}
          />
        </div>

        {/* for description */}
        <div className="inputDiv">
          <h4 className="inputH4"> Description</h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="text"
            name="description"
            placeholder="description"
            onChange={handleInput}
          />
        </div>

        {/* for reimbursementType */}
        <div className="inputDiv">
          <h4 className="inputH4">Reimbursement Type</h4>

          <input
            autoComplete="off"
            className="loginInput"
            type="number"
            name="rType"
            placeholder="reimbursement type"
            onChange={handleInput}
          />
        </div>
      </form>

      {spinner ? (
        <button
          className="submitReimburseButton"
          onClick={handleSubmitReimbursement}
        >
          Submit Reimbursement
        </button>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
