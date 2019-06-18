import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../../store/context/AuthContext';
import { useLayoutContext } from '../../../../store/context/LayoutContext';

import Button from '../../../UI/Button';
import NavSection from '../../../Navigation/NavSection';

import routes from '../../../../lib/config/routes';
import AdminRoutes from '../../../Navigation/RoutesSections/AdminRoutes';
import InstructorRoutes from '../../../Navigation/RoutesSections/InstructorRoutes';
import StudentRoutes from '../../../Navigation/RoutesSections/StudentRoutes';

interface DashboardSidebarMenuProps {
  toggleOpen: () => void;
}

const DashboardSidebarMenu: React.FC<DashboardSidebarMenuProps> = ({ toggleOpen }) => {
  const { t } = useTranslation();
  const { authUser, logout } = useAuth();
  const { isMobile } = useLayoutContext();

  return (
    <>
      {isMobile && (
        <NavSection
          title={authUser ? authUser.name : ''}
          routes={[{ linkText: t('MyProfile'), path: routes.dashboard.user.profile('') }]}
          onLinkClick={toggleOpen}
        />
      )}

      {/* Role based routes links */}
      {!!authUser && authUser.isAdmin && <AdminRoutes onLinkClick={toggleOpen} />}
      {!!authUser && authUser.isInstructor && <InstructorRoutes onLinkClick={toggleOpen} />}
      {!!authUser && authUser.isStudent && <StudentRoutes onLinkClick={toggleOpen} />}

      <NavLink to={routes.dashboard.settings} onClick={toggleOpen}>
        {t('Settings')}
      </NavLink>

      {/* User Logout btn */}
      {isMobile && (
        <Button
          className='logout-btn'
          text={t('Logout')}
          variant='secondary'
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
