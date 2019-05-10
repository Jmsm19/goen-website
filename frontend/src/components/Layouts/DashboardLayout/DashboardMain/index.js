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
import AdminPeriodPage from '../../../../pages/dashboard/admin/activePeriodSummary';
import ManagePeriods from '../../../../pages/dashboard/admin/periods';
import PeriodDetails from '../../../../pages/dashboard/admin/periodDetails';
import UserProfilePage from '../../../../pages/dashboard/user/profile';
import ModulesPage from '../../../../pages/dashboard/admin/modules';
import UsersListPage from '../../../../pages/dashboard/admin/users';

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
            path={routes.dashboard.admin.users}
            component={UsersListPage}
          />

          <RoleRestrictedRoute
            authUser={authUser}
            requiredRole='admin'
            path={routes.dashboard.admin.periodDetails()}
            component={PeriodDetails}
          />

          <RoleRestrictedRoute
            authUser={authUser}
            requiredRole='admin'
            path={routes.dashboard.admin.managePeriods}
            component={ManagePeriods}
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
