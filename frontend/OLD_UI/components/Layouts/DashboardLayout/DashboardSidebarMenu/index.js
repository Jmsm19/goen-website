import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Button from '../../../UI/Button';

import AdminRoutes from '../../RoutesSections/AdminRoutes';
import InstructorRoutes from '../../RoutesSections/InstructorRoutes';
import StudentRoutes from '../../RoutesSections/StudentRoutes';

import routes from '../../../../lib/config/routes';
import NavSection from '../../../Navigation/NavSection';
import { useAuth } from '../../../../store/context/AuthContext';
import useLayoutContext from '../../../../hooks/useLayoutContext';

const DashboardSidebarMenu = ({ toggleOpen }) => {
  const { t } = useTranslation();
  const { isMobile } = useLayoutContext();
  const { authUser, logout } = useAuth();

  return (
    <>
      {isMobile && (
        <NavSection
          title={authUser.name}
          routes={[{ linkText: t('MyProfile'), path: routes.dashboard.user.profile('') }]}
          onLinkClick={toggleOpen}
        />
      )}

      {/* Role based routes links */}
      {!!authUser.isAdmin && <AdminRoutes t={t} onLinkClick={toggleOpen} />}
      {!!authUser.isInstructor && <InstructorRoutes t={t} onLinkClick={toggleOpen} />}
      {!!authUser.isStudent && <StudentRoutes t={t} onLinkClick={toggleOpen} />}

      <NavLink to={routes.dashboard.settings} onClick={toggleOpen}>
        {t('Settings')}
      </NavLink>

      {/* User Logout btn */}
      {isMobile && (
        <Button
          className='logout-btn'
          text={t('Logout')}
          type='secondary'
          onClick={logout}
          outline
        />
      )}
    </>
  );
};

DashboardSidebarMenu.propTypes = {
  toggleOpen: PropTypes.func.isRequired,
};

export default DashboardSidebarMenu;
