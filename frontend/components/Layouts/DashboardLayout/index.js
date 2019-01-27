import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Footer from '../../Footer';
import DashboardSider from '../../Dashboard/DashboardSider';
import DashboardHeader from '../../Dashboard/DashboardHeader';
import DashboardMobileDrawer from '../../Dashboard/DashboardMobileDrawer';
import { StyledLayout, StyledContent } from '../../../styles/components/dashboard/DashboardLayout';

class DashboardLayout extends Component {
  state = {
    isDrawerOpen: false,
    currentPage: '',
  };

  toggleDrawer = () => {
    this.setState(prevState => ({
      isDrawerOpen: !prevState.isDrawerOpen,
    }));
  };

  handlePageChange = (pageKey = null, callbacks = {}) => {
    const { logout } = callbacks;

    if (!pageKey) {
      this.toggleDrawer();
    } else if (pageKey === 'logout') {
      logout();
    } else {
      this.setState(
        {
          currentPage: pageKey,
        },
        () => {
          const { isDrawerOpen } = this.state;
          if (isDrawerOpen) {
            this.toggleDrawer();
          }
        },
      );
    }
  };

  render() {
    const { isDrawerOpen, currentPage } = this.state;
    const { children, isAuth, isMobile } = this.props;

    return (
      <StyledLayout>
        {isAuth && !isMobile && (
          <DashboardSider
            isMobile={isMobile}
            currentPage={currentPage}
            handlePageChange={this.handlePageChange}
          />
        )}

        {isAuth && isMobile && (
          <DashboardMobileDrawer
            isMobile={isMobile}
            currentPage={currentPage}
            handlePageChange={this.handlePageChange}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={this.toggleDrawer}
          />
        )}

        <Layout>
          {isAuth && (
            <DashboardHeader
              isMobile={isMobile}
              currentPage={currentPage}
              handlePageChange={this.handlePageChange}
            />
          )}

          <StyledContent>{children}</StyledContent>

          <Footer />
        </Layout>
      </StyledLayout>
    );
  }
}

DashboardLayout.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
