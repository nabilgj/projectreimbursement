import React, { useState, useEffect } from 'react';
import './EditAccount.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { editUser } from '../../slices/UserSlice';
import { AppDispatch, RootState } from '../../store';

import { Spinner } from '../Spinner/Spinner';
import { Navbar } from '../Navbar/Navbar';

// will go inside HomePage
export const EditAccount: React.FC<any> = (spinner: any) => {
  const userInfo = useSelector((state: RootState) => state.user.user);

  const [username, setUserName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [roleId, setRoleId] = useState<string>('');

  const userId = userInfo?.userId;

  const navigator = useNavigate();

  console.log('coming from ReimbursementForm line 27 ', userInfo?.username);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {}, []);

  // input change handler
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // let x = '/^-?[1-9]d{0,1}(.[1-9]{1})?$/';

    if (event.target.name === 'username') {
      setUserName(event.target.value);
    } else if (event.target.name === 'firstname') {
      setFirstName(event.target.value);
    } else if (event.target.name === 'lastname') {
      setLastName(event.target.value);
    } else if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const onSelectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      event.target.value === 'financemanager' &&
      userInfo?.role !== event.target.value
    ) {
      setRoleId('1');
    } else if (
      event.target.value === 'employee' &&
      userInfo?.role !== event.target.value
    ) {
      setRoleId('2');
    }
  };

  // form submit handler
  const handleEditUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    let credentials = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email,
      password,
      role_id: parseInt(roleId),
      // userId: userId,
    };

    console.log('coming from edit account line 69 ', credentials);
    dispatch(editUser(credentials));

    navigator('/home');
  };

  return (
    <>
      <Navbar />
      <div className="reimburseForm">
        <form className="loginForm">
          {/* for email */}
          <div className="inputDiv">
            <h4 className="inputH4"> Username </h4>

            <input
              // autoComplete="off"
              className="loginInput"
              type="text"
              value={userInfo?.username}
              name="username"
              placeholder="username"
              // onChange={handleInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(event.target.value)
              }
            />
          </div>

          {/* for description */}
          <div className="inputDiv">
            <h4 className="inputH4"> First Name </h4>

            <input
              autoComplete="off"
              className="loginInput"
              type="text"
              value={userInfo?.firstName}
              name="firstname"
              placeholder="first name"
              onChange={handleInput}
            />
          </div>

          {/* for description */}
          <div className="inputDiv">
            <h4 className="inputH4"> Last Name </h4>

            <input
              autoComplete="off"
              className="loginInput"
              type="text"
              value={userInfo?.lastName}
              name="lastname"
              placeholder="last name"
              onChange={handleInput}
            />
          </div>

          {/* for description */}
          <div className="inputDiv">
            <h4 className="inputH4"> Email</h4>

            <input
              autoComplete="off"
              className="loginInput"
              type="text"
              value={userInfo?.email}
              name="email"
              placeholder="email"
              onChange={handleInput}
            />
          </div>

          {/* for description */}
          <div className="inputDiv">
            <h4 className="inputH4"> Password </h4>

            <input
              autoComplete="off"
              className="loginInput"
              type="text"
              value={userInfo?.password}
              name="password"
              placeholder="password"
              onChange={handleInput}
            />
          </div>

          <div className="inputDiv">
            <h4 className="inputH4">Reimbursement Type</h4>
            <select
              name="financemployee"
              className="loginInput"
              onChange={onSelectValue}
            >
              <option value="financemanager">
                {userInfo?.role === 'FinanceManager'
                  ? 'Finance Manager'
                  : 'Employee'}
              </option>

              <option value="employee">
                {userInfo?.role !== 'Employee' ? 'Employee' : 'Finance Manager'}
              </option>

              {/* <option value="Food">Food</option> */}
            </select>
          </div>
        </form>

        {spinner ? (
          <button className="submitReimburseButton" onClick={handleEditUser}>
            Edit User
          </button>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
