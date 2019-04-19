import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PoseGroup } from 'react-pose';
import { AuthContext } from '../../../context/AuthContext';

import Loading from '../../Loading';
import Button from '../../UI/Button';
import DashboardHomePage from '../../../pages/dashboard/home';
import Sidebar from '../../Navigation/Sidebar';

import routes from '../../../lib/config/routes';
import AdminRoutes from '../RoutesSections/AdminRoutes';
import InstructorRoutes from '../RoutesSections/InstructorRoutes';
import StudentRoutes from '../RoutesSections/StudentRoutes';
import TopNavigation from './TopNavigation';
import ModuleRegisterPage from '../../../pages/dashboard/student/moduleRegister';
import InstructorModulesPage from '../../../pages/dashboard/instructor/modules';
import SettingsPage from '../../../pages/dashboard/settings';
import { FadeInRouteContainer } from '../../../animations/components';
import ProfilePage from '../../../pages/dashboard/profile';

import { StyledLayout, LogoutIcon } from './styles';

const DashboardLayout = ({ isMobile, location }) => {
  const { t } = useTranslation();
  const { isAuth, getAuthUser, authUser, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const delayedToggleSidebar = () => {
    setTimeout(() => {
      toggleSidebar();
    }, 100);
  };

  useEffect(() => {
    if (isAuth) {
      getAuthUser();
    }
  }, []);

  if (!isAuth) {
    return <Redirect to={routes.login} />;
  }

  if (!authUser) {
    return <Loading text='Loading user data...' />;
  }

  return (
    <StyledLayout className='dashboard-layout'>
      <TopNavigation
        t={t}
        routes={routes}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
        logoutUser={logout}
      />

      <div className='inner-layout'>
        <Sidebar isMobile={isMobile} isOpen={isSidebarOpen} toggleOpen={toggleSidebar}>
          {isMobile && (
            <NavLink to={routes.dashboard.user.profile} onClick={delayedToggleSidebar}>
              {t('Profile')}
            </NavLink>
          )}
          <AdminRoutes t={t} onLinkClick={delayedToggleSidebar} />
          <InstructorRoutes t={t} onLinkClick={delayedToggleSidebar} />
          <StudentRoutes t={t} onLinkClick={delayedToggleSidebar} />
          <NavLink to={routes.dashboard.settings}>{t('Settings')}</NavLink>
          {isMobile && (
            <Button
              className='logout-btn'
              icon={<LogoutIcon title={t('Logout')} size={24} />}
              text={t('Logout')}
              type='secondary'
              onClick={logout}
              outline
            />
          )}
        </Sidebar>

        <main className='main-content'>
          <Switch>
            <PoseGroup>
              <FadeInRouteContainer key={location.pathname}>
                <Route path={routes.dashboard.user.profile} component={ProfilePage} />
                <Route path={routes.dashboard.instructor.home} component={InstructorModulesPage} />
                <Route
                  path={routes.dashboard.student.moduleRegister}
                  component={ModuleRegisterPage}
                />
                <Route path={routes.dashboard.settings} component={SettingsPage} />

                <Route exact path={routes.dashboard.home} component={DashboardHomePage} />
              </FadeInRouteContainer>
            </PoseGroup>
          </Switch>
        </main>
      </div>
    </StyledLayout>
  );
};

DashboardLayout.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DashboardLayout;
