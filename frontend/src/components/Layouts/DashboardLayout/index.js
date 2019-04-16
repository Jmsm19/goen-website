import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../../context/AuthContext';

import DashboardHomePage from '../../../pages/dashboard/home';

const DashboardLayout = ({ location }) => {
  const basePath = location.pathname; // ---> /dashboard

  const { isAuth, getAuthUser } = useContext(AuthContext);

  useEffect(() => {
    getAuthUser();
  }, []);

  if (!isAuth) {
    return <Redirect to='/' />;
  }

  return (
    <div className='dashboard-layout'>
      <Switch>
        <Route exact path={`${basePath}/`} component={DashboardHomePage} />
      </Switch>
    </div>
  );
};

DashboardLayout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DashboardLayout;
