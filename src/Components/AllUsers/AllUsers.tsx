import React from 'react';

import { IUser } from '../../interfaces/IUser';

// go inside HomePage
export const AllUsers: React.FC<IUser> = (allUsers: IUser) => {
  return (
    <div className="users">
      <div className="usersProfile">
        {/* <img src="asa.jpg" /> */}

        <h3 className="userName">{allUsers.firstName}</h3>
      </div>

      <div className="userRole">
        <p>{allUsers.role}</p>
      </div>
    </div>
  );
};
