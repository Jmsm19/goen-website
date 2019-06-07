import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import useDrawerStyles from '../styles';

const DesktopDrawer = ({ children }) => {
  const classes = useDrawerStyles();

  return (
    <Drawer
      open
      variant='permanent'
      className={`drawer ${classes.drawer}`}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={`drawer-toolbar-gap ${classes.toolbar}`} />

      {children}
    </Drawer>
  );
};

DesktopDrawer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DesktopDrawer;