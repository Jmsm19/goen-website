import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Button from '../../../UI/Button';
import Sidebar from '../../../Navigation/Sidebar';

import AdminRoutes from '../../RoutesSections/AdminRoutes';
import InstructorRoutes from '../../RoutesSections/InstructorRoutes';
import StudentRoutes from '../../RoutesSections/StudentRoutes';

import routes from '../../../../lib/config/routes';
import { LogoutIcon } from '../styles';

const DashboardSidebar = ({ t, isMobile, logoutUser, authUser, isSidebarOpen, toggleOpen }) => {
  const delayedToggleSidebar = () => {
    setTimeout(() => {
      toggleOpen();
    }, 100);
  };

  return (
    <Sidebar isMobile={isMobile} isOpen={isSidebarOpen} toggleOpen={toggleOpen}>
      {isMobile && (
        <NavLink to={routes.dashboard.user.profile} onClick={delayedToggleSidebar}>
          {t('Profile')}
        </NavLink>
      )}

      {/* Role based routes links */}
      {!!authUser.isAdmin && <AdminRoutes t={t} onLinkClick={delayedToggleSidebar} />}
      {!!authUser.isInstructor && <InstructorRoutes t={t} onLinkClick={delayedToggleSidebar} />}
      {!!authUser.isStudent && <StudentRoutes t={t} onLinkClick={delayedToggleSidebar} />}

      {/* Settings route link and logout btn */}
      <NavLink to={routes.dashboard.settings}>{t('Settings')}</NavLink>
      {isMobile && (
        <Button
          className='logout-btn'
          icon={<LogoutIcon title={t('Logout')} size={24} />}
          text={t('Logout')}
          type='secondary'
          onClick={logoutUser}
          outline
        />
      )}
    </Sidebar>
  );
};

DashboardSidebar.propTypes = {
  authUser: PropTypes.shape({
    isAdmin: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool.isRequired,
    isStudent: PropTypes.bool.isRequired,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

export default DashboardSidebar;
