import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import RoleRestrictedRoute from '../../../RoleRestrictedRoute';
import ModuleRegisterPage from '../../../../pages/dashboard/student/moduleRegister';
import InstructorModulesPage from '../../../../pages/dashboard/instructor/modules';
import SettingsPage from '../../../../pages/dashboard/settings';
import DashboardHomePage from '../../../../pages/dashboard/home';

import ActivePeriodPage from '../../../../pages/dashboard/admin/activePeriod';
import ManagePeriods from '../../../../pages/dashboard/admin/periods';
import PeriodDetailsPage from '../../../../pages/dashboard/admin/periodDetails';
import UserProfilePage from '../../../../pages/dashboard/user/profile';
import ModulesPage from '../../../../pages/dashboard/admin/modules';
import UsersListPage from '../../../../pages/dashboard/admin/users';

import FadeInPageTransition from '../../../Animations/FadeInPageTransition';
import routes from '../../../../lib/config/routes';

const DashboardMain: React.FC = () => (
  <Container className='main-content' component='main'>
    <FadeInPageTransition className='main-content-children-animation-wrapper'>
      <Route path={routes.dashboard.user.profile()} component={UserProfilePage} />

      <RoleRestrictedRoute
        requiredRole='admin'
        path={routes.dashboard.admin.modules}
        component={ModulesPage}
      />

      <RoleRestrictedRoute
        requiredRole='admin'
        path={routes.dashboard.admin.users}
        component={UsersListPage}
      />

      <RoleRestrictedRoute
        requiredRole='admin'
        path={routes.dashboard.admin.periodDetails()}
        component={PeriodDetailsPage}
      />

      <RoleRestrictedRoute
        requiredRole='admin'
        path={routes.dashboard.admin.managePeriods}
        component={ManagePeriods}
      />

      <RoleRestrictedRoute
        requiredRole='admin'
        path={routes.dashboard.admin.home}
        component={ActivePeriodPage}
      />

      <RoleRestrictedRoute
        requiredRole='instructor'
        path={routes.dashboard.instructor.home}
        component={InstructorModulesPage}
      />

      <RoleRestrictedRoute
        requiredRole='student'
        path={routes.dashboard.student.moduleRegister}
        component={ModuleRegisterPage}
      />

      <Route path={routes.dashboard.settings} component={SettingsPage} />

      <Route exact path={routes.dashboard.home} component={DashboardHomePage} />

      <Route component={() => <h1>404</h1>} />
      {/* </Switch> */}
    </FadeInPageTransition>
  </Container>
);

export default DashboardMain;
