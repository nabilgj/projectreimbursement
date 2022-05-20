import React from 'react';
import './HomeView.css';

import { Link } from 'react-router-dom';

// go inside HomePage
export const HomeView: React.FC<any> = () => {
  return (
    <div className="some-page-wrapper">
      {/* 1st row */}
      <div className="row">
        <div className="column">
          <div className="blue-column">
            <h3 className="textHeader">
              Do you have something to get the reimburse for?
            </h3>
            <p>Submit your reimbursement request today!</p>

            <Link to="/reimbursement">
              <button>Submit Request</button>
            </Link>
          </div>
        </div>
        <div className="column">
          <div className="green-column">
            <h3 className="textHeader">View Accounts Information</h3>
          </div>
        </div>
      </div>

      {/* 2nd row */}
      <div className="row2">
        <div className="column">
          <div className="blue-column">
            <h3 className="textHeader">View All Pending Requests</h3>
          </div>
        </div>
        <div className="column">
          <div className="green-column">
            <h3 className="textHeader">View all Resolved Request</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
