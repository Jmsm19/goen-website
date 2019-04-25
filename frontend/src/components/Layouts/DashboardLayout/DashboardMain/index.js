import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { PoseGroup } from 'react-pose';

import RoleRestrictedRoute from '../../../RoleRestrictedRoute';
import ModuleRegisterPage from '../../../../pages/dashboard/student/moduleRegister';
import InstructorModulesPage from '../../../../pages/dashboard/instructor/modules';
import SettingsPage from '../../../../pages/dashboard/settings';
import ProfilePage from '../../../../pages/dashboard/profile';
import DashboardHomePage from '../../../../pages/dashboard/home';

import routes from '../../../../lib/config/routes';
import { FadeInRouteContainer } from '../../../../animations/components';
import AdminPeriodPage from '../../../../pages/dashboard/admin/period';

const DashboardMain = ({ authUser, location }) => (
  <main className='main-content'>
    <Switch>
      <PoseGroup>
        <FadeInRouteContainer key={location.pathname}>
          <Route path={routes.dashboard.user.profile} component={ProfilePage} />

          <RoleRestrictedRoute
            authUser={authUser}
            requiredRole='admin'
            path={routes.dashboard.admin.home}
            component={AdminPeriodPage}
          />

          <RoleRestrictedRoute
            authUser={authUser}
            requiredRole='instructor'
            path={routes.dashboard.instructor.home}
            component={InstructorModulesPage}
          />

          <RoleRestrictedRoute
            authUser={authUser}
            requiredRole='student'
            path={routes.dashboard.student.moduleRegister}
            component={ModuleRegisterPage}
          />
          <Route path={routes.dashboard.settings} component={SettingsPage} />

          <Route exact path={routes.dashboard.home} component={DashboardHomePage} />
        </FadeInRouteContainer>
      </PoseGroup>
    </Switch>
  </main>
);

DashboardMain.propTypes = {
  authUser: PropTypes.shape().isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default DashboardMain;
