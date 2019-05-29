import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import FloatButton from '../../../UI/FloatButton';
import Sidebar from '../../../Navigation/Sidebar';

import AdminRoutes from '../../RoutesSections/AdminRoutes';
import InstructorRoutes from '../../RoutesSections/InstructorRoutes';
import StudentRoutes from '../../RoutesSections/StudentRoutes';

import routes from '../../../../lib/config/routes';
import NavSection from '../../../Navigation/NavSection';

const DashboardSidebar = ({ t, isMobile, logoutUser, authUser, isSidebarOpen, toggleOpen }) => {
  const delayedToggleSidebar = () => {
    setTimeout(() => {
      toggleOpen();
    }, 100);
  };

  return (
    <Sidebar isMobile={isMobile} isOpen={isSidebarOpen} toggleOpen={toggleOpen}>
      {isMobile && (
        <NavSection
          title={authUser.name}
          routes={[{ linkText: t('MyProfile'), path: routes.dashboard.user.profile('') }]}
          onLinkClick={delayedToggleSidebar}
        />
      )}

      {/* Role based routes links */}
      {!!authUser.isAdmin && <AdminRoutes t={t} onLinkClick={delayedToggleSidebar} />}
      {!!authUser.isInstructor && <InstructorRoutes t={t} onLinkClick={delayedToggleSidebar} />}
      {!!authUser.isStudent && <StudentRoutes t={t} onLinkClick={delayedToggleSidebar} />}

      <NavLink to={routes.dashboard.settings} onClick={delayedToggleSidebar}>
        {t('Settings')}
      </NavLink>

      {/* User Logout btn */}
      {isMobile && (
        <FloatButton className='logout-btn' theme='secondary' onClick={logoutUser}>
          {t('Logout')}
        </FloatButton>
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
