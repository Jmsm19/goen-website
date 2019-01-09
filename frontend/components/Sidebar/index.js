/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { Menu, Icon } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { withNamespaces } from '../../i18n';
import NavigationMenu from '../NavigationMenu';
import { StyledSidebar, StyledMask } from '../../styles/components/Sidebar';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

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
          <NavigationMenu isMobile={isMobile} />
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
