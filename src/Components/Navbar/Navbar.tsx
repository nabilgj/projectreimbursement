import React from 'react';
import './Navbar.css';

import { Link } from 'react-router-dom';
import profilepic from '../../profile.jpg';

// inside ReimbursementPage
export const Navbar: React.FC = () => {
  const handleLogout = () => {};

  return (
    <nav className="navbar">
      <img className="profilePic" src={profilepic} />

      <ul className="navMenu">
        <li className="navItem">
          <Link to={'/reimburse'} className="navLink">
            Profile
          </Link>
        </li>

        <li className="navItem">
          <Link to={'/reimburse'} className="navLink">
            Home
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
