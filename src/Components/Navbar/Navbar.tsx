import React, { useEffect } from 'react';
import './Navbar.css';

import { Link, useNavigate } from 'react-router-dom';
import profilepic from '../../profile.jpg';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { logoutUser } from '../../slices/UserSlice';

// inside ReimbursementPage
export const Navbar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    // navigator('/login');
  };

  useEffect(() => {
    if (!user) {
      navigator('/login');
    }
    // dispatch(getAllResolved());
  }, [user]);

  return (
    <nav className={user?.role === 'FinanceManager' ? 'mNavBar' : 'eNavBar'}>
      {/* <img className="profilePic" src={profilepic} /> */}
      <Link to={'/home'} className="navLink">
        <p className="profilePic">{user?.username}</p>
      </Link>

      <ul className="navMenu">
        <li className="navItem">
          {/* <Link
            to={`/reimbursements/getAllRequestsByEmployee/${user?.userId}`}
            className="navLink"
          >
            {role}
          </Link> */}
        </li>

        {/* <li className="navItem">
          <Link to={'/reimburse'} className="navLink">
            {user?.role === 'FinanceManager' ? 'mHome' : 'eHome'}
          </Link>
        </li> */}

        <li className="navItem">
          <Link
            to={
              user?.role === 'FinanceManager'
                ? '/login'
                : '/submitreimbursement'
            }
            className="navLink"
          >
            {user?.role === 'FinanceManager'
              ? 'See Reimbursements'
              : 'Submit Reimbursements'}
          </Link>
        </li>

        <li className="navItem">
          <Link
            to={user?.role === 'FinanceManager' ? '/login' : '/resolvedrequest'}
            className="navLink"
          >
            {user?.role === 'FinanceManager' ? 'All Requests' : 'All Request'}
          </Link>
        </li>

        <li className="logout">
          {/* <Link to={'/login'} className="navLink">

          </Link> */}

          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
