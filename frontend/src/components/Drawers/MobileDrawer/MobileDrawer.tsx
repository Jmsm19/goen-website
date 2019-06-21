import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import useDrawerStyles from '../styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MobileDrawer: React.FC<Props> = ({ isOpen, onClose, children }) => {
  const classes = useDrawerStyles();

  return (
    <Drawer
      open={isOpen}
      anchor='left'
      variant='temporary'
      onClose={onClose}
      className={`drawer ${classes.drawer}`}
      classes={{ paper: classes.drawerPaper }}
      ModalProps={{ keepMounted: true }}
    >
      <div className='drawer-toolbar-gap' />

      {children}
    </Drawer>
  );
};

MobileDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default MobileDrawer;
