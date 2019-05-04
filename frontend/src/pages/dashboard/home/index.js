import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../../context/AuthContext';

import routes from '../../../lib/config/routes';

const DashboardHomePage = props => {
  const { authUser } = useContext(AuthContext);
  let path = routes.dashboard.student.home;

  if (authUser.isAdmin) {
    path = routes.dashboard.admin.home;
  } else if (authUser.isInstructor) {
    path = routes.dashboard.instructor.home;
  } else if (authUser.isStudent) {
    path = routes.dashboard.student.moduleRegister;
  }

  return <Redirect to={path} push={false} />;
};

DashboardHomePage.propTypes = {};

export default DashboardHomePage;
