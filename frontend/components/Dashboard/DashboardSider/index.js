import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from '../../../i18n';
import { AuthContextConsumer } from '../../../context/AuthContext';
import StyledSider from '../../../styles/components/dashboard/DashboardSider';
import DashboardNavigation from '../DashboardNavigation';

class DashboardSider extends Component {
  state = {};

  render() {
    const { t, currentPage, handlePageChange } = this.props;

    return (
      <AuthContextConsumer>
        {({ handleLogout, authUser }) => (
          <StyledSider width='max-content'>
            <DashboardNavigation
              t={t}
              authUser={authUser}
              isMobile={false}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handleLogout={handleLogout}
            />
          </StyledSider>
        )}
      </AuthContextConsumer>
    );
  }
}

DashboardSider.propTypes = {
  t: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default withNamespaces('common')(DashboardSider);
