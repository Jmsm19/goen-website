import React, { useContext } from 'react';

import Button from '../../../components/UI/Button';
import { AuthContext } from '../../../context/AuthContext';

const DashboardHomePage = props => {
  const { logout, authUser } = useContext(AuthContext);

  return (
    authUser && (
      <div>
        <p>Dashboard Home</p>
        <p>Hi, {authUser.name}</p>
        <Button text='Logout' onClick={logout} />
      </div>
    )
  );
};

DashboardHomePage.propTypes = {};

export default DashboardHomePage;
