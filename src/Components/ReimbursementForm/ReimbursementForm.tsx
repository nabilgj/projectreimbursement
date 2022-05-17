import React, { useState, useEffect } from 'react';
import './ReimbursementForm.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getAllResolved,
  submitReimbursement,
} from '../../slices/ReimbursementSlice';
import { AppDispatch, RootState } from '../../store';

import { Spinner } from '../Spinner/Spinner';
import { Navbar } from '../Navbar/Navbar';

// will go inside HomePage
export const ReimbursementForm: React.FC<any> = (spinner: any) => {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rType, setRType] = useState<string>('');

  const userInfo = useSelector((state: RootState) => state.user);
  const reimburseInfo = useSelector((state: RootState) => state.reimbursement);
  const navigator = useNavigate();

  console.log('coming from ReimbursementForm line 20 ', userInfo.user?.role);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllResolved());
  }, []);

  // input change handler
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let x = '/^-?[1-9]d{0,1}(.[1-9]{1})?$/';

    if (event.target.name === 'amount' && event.target.value === x) {
      setAmount(event.target.value);
    } else if (event.target.name === 'description') {
      setDescription(event.target.value);
    }
    // else if (event.target.value === 'rType') {
    //   setRType(event.target.value);
    // }
  };

  const onSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Lodging') {
      setRType('1');
    } else if (event.target.value === 'Food') {
      setRType('2');
    } else if (event.target.value === 'Travel') {
      setRType('3');
    } else if (event.target.value === 'Other') {
      setRType('4');
    }
  };

  // form submit handler
  const handleSubmitReimbursement = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    let credentials = {
      amount: parseInt(amount),
      description: description,
      reimbursementType: parseInt(rType),
    };

    dispatch(submitReimbursement(credentials));
    navigator('/home');
  };

  return (
    <>
      <Navbar />
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
          {/* <div className="inputDiv">
            <h4 className="inputH4">Reimbursement Type</h4>

            <input
              autoComplete="off"
              className="loginInput"
              type="number"
              name="rType"
              placeholder="reimbursement type"
              onChange={handleInput}
            />
          </div> */}

          <div className="inputDiv">
            <h4 className="inputH4">Reimbursement Type</h4>
            <select
              name="rType"
              className="loginInput"
              onChange={onSelectValue}
            >
              <option value="Lodging">Lodging</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
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
    </>
  );
};
