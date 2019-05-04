import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { PoseGroup } from 'react-pose';

import RoleRestrictedRoute from '../../../RoleRestrictedRoute';
import ModuleRegisterPage from '../../../../pages/dashboard/student/moduleRegister';
import InstructorModulesPage from '../../../../pages/dashboard/instructor/modules';
import SettingsPage from '../../../../pages/dashboard/settings';
import DashboardHomePage from '../../../../pages/dashboard/home';

import routes from '../../../../lib/config/routes';
import { FadeInRouteContainer } from '../../../../animations/components';
import AdminPeriodPage from '../../../../pages/dashboard/admin/period';
import ModuleDetailsPage from '../../../../pages/dashboard/admin/moduleDetails';
import UserProfilePage from '../../../../pages/dashboard/user/profile';
import ModulesPage from '../../../../pages/dashboard/admin/modules';

const DashboardMain = ({ authUser, location }) => (
  <main className='main-content'>
    <PoseGroup>
      <FadeInRouteContainer key={location.pathname} className='route-container'>
        <Switch location={location}>
          <Route path={routes.dashboard.user.profile()} component={UserProfilePage} />

          <RoleRestrictedRoute
            authUser={authUser}
            requiredRole='admin'
            path={routes.dashboard.admin.modules}
            component={ModulesPage}
          />

          <RoleRestrictedRoute
            authUser={authUser}
            requiredRole='admin'
            path={routes.dashboard.admin.module()}
            component={ModuleDetailsPage}
          />

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

          <Route component={() => console.log('404')} />
        </Switch>
      </FadeInRouteContainer>
    </PoseGroup>
  </main>
);

DashboardMain.propTypes = {
  authUser: PropTypes.shape().isRequired,
  location: PropTypes.shape({
    key: PropTypes.string,
  }).isRequired,
};

export default DashboardMain;
