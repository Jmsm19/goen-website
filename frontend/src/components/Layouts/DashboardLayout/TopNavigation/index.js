import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import routes from '../../../../lib/config/routes';
import FloatButton from '../../../UI/FloatButton';

import { MenuIcon } from '../styles';

const TopNavigation = ({ t, isMobile, toggleSidebar, logoutUser }) => (
  <nav className='top-navigation'>
    <h1 className='site-title'>GOEN Maracaibo</h1>

    <nav className='right-nav'>
      {!isMobile && (
        <>
          <NavLink exact to={routes.dashboard.user.profile('')}>
            {t('MyProfile')}
          </NavLink>
          <FloatButton className='logout-btn' theme='secondary' onClick={logoutUser}>
            {t('Logout')}
          </FloatButton>
        </>
      )}
      {isMobile && (
        <FloatButton className='open-sidebar-btn' onClick={toggleSidebar}>
          <MenuIcon title={t('OpenSidebar')} size={36} />
        </FloatButton>
      )}
    </nav>
  </nav>
);

TopNavigation.propTypes = {
  t: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default TopNavigation;
