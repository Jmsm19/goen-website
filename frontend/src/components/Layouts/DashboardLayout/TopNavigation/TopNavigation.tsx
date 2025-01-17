import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Hidden } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import Button from '../../../UI/Button';

import routes from '../../../../lib/config/routes';
import useTopNavStyles from './styles';

interface TopNavigationProps {
  toggleSidebar: () => void;
  logoutUser: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ toggleSidebar, logoutUser }) => {
  const { t } = useTranslation();
  const classes = useTopNavStyles();

  return (
    <AppBar className={`top-navigation ${classes.root}`} position='fixed'>
      <Toolbar component='nav'>
        <Typography variant='h4' component='h1' color='inherit' style={{ marginRight: 'auto' }}>
          GOEN Maracaibo
        </Typography>

        <Hidden mdUp implementation='css'>
          <Toolbar className='right-nav' component='nav'>
            <IconButton
              edge='end'
              aria-label={t('OpenSidebar')}
              color='inherit'
              className='open-sidebar-btn'
              onClick={toggleSidebar}
            >
              <MenuIcon titleAccess={t('OpenSidebar')} />
            </IconButton>
          </Toolbar>
        </Hidden>

        <Hidden smDown implementation='css'>
          <Toolbar className='right-nav' component='nav'>
            <NavLink exact to={routes.dashboard.user.profile('')}>
              {t('MyProfile')}
            </NavLink>
            <Button
              className='logout-btn'
              text={t('Logout')}
              variant='secondary'
              outline
              onClick={logoutUser}
            />
          </Toolbar>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopNavigation.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default TopNavigation;
