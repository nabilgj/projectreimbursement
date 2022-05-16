import React, { useEffect } from 'react';
import './Navbar.css';

import { Link } from 'react-router-dom';
import profilepic from '../../profile.jpg';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

// inside ReimbursementPage
export const Navbar: React.FC = () => {
  const handleLogout = () => {};

  const user = useSelector((state: RootState) => state.user.user);

  // useEffect(() => {
  //   console.log('coming from Navbar useEffect line 17 ', user);
  // }, [user]);

  return (
    <nav className={user?.role === 'FinanceManager' ? 'mNavBar' : 'eNavBar'}>
      {/* <img className="profilePic" src={profilepic} /> */}
      <p className="profilePic">{user?.username}</p>

      <ul className="navMenu">
        <li className="navItem">
          {/* <Link
            to={`/reimbursements/getAllRequestsByEmployee/${user?.userId}`}
            className="navLink"
          >
            {role}
          </Link> */}
        </li>

        <li className="navItem">
          <Link to={'/reimburse'} className="navLink">
            {user?.role === 'FinanceManager' ? 'mHome' : 'eHome'}
          </Link>
        </li>

        <li className="navItem">
          <Link to={'/reimburse'} className="navLink">
            {user?.role === 'FinanceManager'
              ? 'See Reimbursements'
              : 'Submit Reimbursements'}
          </Link>
        </li>

        <li className="navItem">
          <Link to={'/reimburse'} className="navLink">
            {user?.role === 'FinanceManager' ? 'All Requests' : 'All Request'}
          </Link>
        </li>

        <li className="logout">
          <Link to={'/login'} className="navLink">
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
