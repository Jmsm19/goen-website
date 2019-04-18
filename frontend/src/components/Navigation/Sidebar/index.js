import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledSidebar, { StyledNav, StyledBackdrop } from './styles';

const Sidebar = ({ isMobile, isOpen, toggleOpen, children }) => {
  const className = classnames(['sidebar'], {
    mobile: isMobile,
  });

  return (
    <StyledSidebar className={className} pose={isOpen || !isMobile ? 'open' : 'closed'}>
      <StyledNav className='side-nav'>{children}</StyledNav>

      {isMobile && (
        <StyledBackdrop
          className='backdrop'
          pose={isOpen ? 'open' : 'closed'}
          onClick={toggleOpen}
        />
      )}
    </StyledSidebar>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

export default Sidebar;
