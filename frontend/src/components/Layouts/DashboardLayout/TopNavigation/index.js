import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import routes from '../../../../lib/config/routes';
import Button from '../../../UI/Button';

import { LogoutIcon, MenuIcon } from '../styles';

const TopNavigation = ({ t, isMobile, toggleSidebar, logoutUser }) => (
  <nav className='top-navigation'>
    <h1>GOEN Maracaibo</h1>

    <nav className='right-nav'>
      {!isMobile && (
        <>
          <NavLink to={routes.dashboard.user.profile}>{t('Profile')}</NavLink>
          <Button
            className='logout-btn'
            text={t('Logout')}
            icon={<LogoutIcon title={t('Logout')} size={24} />}
            type='secondary'
            outline
            onClick={logoutUser}
          />
        </>
      )}
      {isMobile && (
        <Button
          className='open-sidebar-btn'
          icon={<MenuIcon title={t('OpenSidebar')} size={36} />}
          onClick={toggleSidebar}
          outline
        />
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
