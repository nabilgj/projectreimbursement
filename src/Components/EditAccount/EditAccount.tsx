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

  const [username, setUserName] = useState(userInfo?.username);
  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState(userInfo?.password);

  const [roleId, setRoleId] = useState(userInfo?.role_id);

  const navigator = useNavigate();

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

  const onUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'FinanceManager') {
      setRoleId(1);
    } else {
      setRoleId(2);
    }
  };

  // form submit handler
  const handleEditUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    let credentials = {
      user_id: userInfo?.user_id,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email,
      password,
      role_id: roleId,
    };

    dispatch(editUser(credentials));
    navigator('/viewaccount');
  };

  return (
    <>
      <Navbar />
      <div className="editForm">
        <form className="loginForm">
          {/* for email */}
          <div className="editInputDiv">
            <h4 className="inputH4"> Username </h4>

            <input
              // autoComplete="off"
              className="editLoginInput"
              type="text"
              value={username}
              name="username"
              onChange={handleInput}
            />
          </div>

          {/* for description */}
          <div className="inputDiv">
            <h4 className="inputH4"> First Name </h4>

            <input
              autoComplete="off"
              className="editLoginInput"
              type="text"
              value={firstName}
              name="firstname"
              onChange={handleInput}
            />
          </div>

          {/* for description */}
          <div className="inputDiv">
            <h4 className="inputH4"> Last Name </h4>

            <input
              autoComplete="off"
              className="editLoginInput"
              type="text"
              value={lastName}
              name="lastname"
              onChange={handleInput}
            />
          </div>

          {/* for description */}
          <div className="inputDiv">
            <h4 className="inputH4"> Email</h4>

            <input
              autoComplete="off"
              className="editLoginInput"
              type="text"
              value={email}
              name="email"
              onChange={handleInput}
            />
          </div>

          {/* for description */}
          <div className="inputDiv">
            <h4 className="inputH4"> Password </h4>

            <input
              autoComplete="off"
              className="editLoginInput"
              type="text"
              value={password}
              name="password"
              onChange={handleInput}
            />
          </div>
        </form>

        {spinner ? (
          <button className="editAccountButton" onClick={handleEditUser}>
            Edit User
          </button>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
