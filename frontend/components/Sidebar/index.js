/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavigationMenu from '../NavigationMenu';
import { StyledSidebar, StyledMask } from '../../styles/components/Sidebar';

class SidebarNavigation extends Component {
  state = {
    isCollapsed: false,
  };

  toggleColapse = () => {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed,
    }));
  };

  render() {
    const { isCollapsed } = this.state;
    const { isMobile } = this.props;

    return (
      <>
        <StyledSidebar
          collapsed={isCollapsed}
          collapsible
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={broken => {
            // console.log(broken);
          }}
          onCollapse={collapsed => {
            this.setState({
              isCollapsed: collapsed,
            });
          }}
        >
          <NavigationMenu isMobile={isMobile} toggleSidebar={this.toggleColapse} />
        </StyledSidebar>
        {!isCollapsed && <StyledMask onClick={this.toggleColapse} />}
      </>
    );
  }
}

SidebarNavigation.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default SidebarNavigation;
export const CleanSidebarNavigation = SidebarNavigation;
