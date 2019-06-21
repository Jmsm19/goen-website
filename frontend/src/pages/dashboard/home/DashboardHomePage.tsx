import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../../store/context/AuthContext';

import routes from '../../../lib/config/routes';

const DashboardHomePage: React.FC = () => {
  const { authUser } = useAuth();
  let path = routes.dashboard.student.home;

  if (authUser) {
    if (authUser.isAdmin) {
      path = routes.dashboard.admin.home;
    } else if (authUser.isInstructor) {
      path = routes.dashboard.instructor.home;
    } else if (authUser.isStudent) {
      path = routes.dashboard.student.moduleRegister;
    }
  } else {
    throw Error('authUser is not defined');
  }

  return <Redirect to={path} push={false} />;
};

export default DashboardHomePage;
