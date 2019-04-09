import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from '../../../i18n';
import { AuthContextConsumer } from '../../../context/AuthContext';
import StyledDrawer from '../../../styles/components/dashboard/DashboardMobileDrawer';
import DashboardNavigation from '../DashboardNavigation';

class DashboardMobileDrawer extends Component {
  state = {};

  render() {
    const { t, isMobile, isDrawerOpen, toggleDrawer, currentPage, handlePageChange } = this.props;

    return (
      <AuthContextConsumer>
        {({ handleLogout, authUser }) =>
          authUser && (
            <StyledDrawer visible={isDrawerOpen} closable width='100%' onClose={toggleDrawer}>
              <DashboardNavigation
                t={t}
                authUser={authUser}
                isMobile={isMobile}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                handleLogout={handleLogout}
              />
            </StyledDrawer>
          )
        }
      </AuthContextConsumer>
    );
  }
}

DashboardMobileDrawer.propTypes = {
  t: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default withNamespaces('common')(DashboardMobileDrawer);
