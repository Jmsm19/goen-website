import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import routes from '../../../../lib/config/routes';
import Button from '../../../UI/Button';

import { MenuIcon } from '../styles';

const TopNavigation = ({ t, isMobile, toggleSidebar, logoutUser }) => (
  <nav className='top-navigation'>
    <h1>GOEN Maracaibo</h1>

    <nav className='right-nav'>
      {!isMobile && (
        <>
          <NavLink exact to={routes.dashboard.user.profile('')}>
            {t('MyProfile')}
          </NavLink>
          <Button
            className='logout-btn'
            text={t('Logout')}
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
