import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';

import { capitalize } from '../../lib/utils';
import routes from '../../lib/config/routes';

const RoleRestrictedRoute = ({ authUser, path, component: Component, requiredRole }) => (
  <Route
    exact
    path={path}
    render={rProps => {
      if (requiredRole) {
        const { location } = rProps;
        const upperCaseRole = capitalize(requiredRole);

        if (!authUser[`is${upperCaseRole}`] && location.pathname !== routes.dashboard.home) {
          return <Redirect to={routes.dashboard.home} />;
        }
      }

      return <Component {...rProps} />;
    }}
  />
);
RoleRestrictedRoute.defaultProps = {
  requiredRole: null,
};

RoleRestrictedRoute.propTypes = {
  authUser: PropTypes.shape().isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  requiredRole: PropTypes.oneOf(['admin', 'instructor', 'assistant', 'student']),
};

export default withRouter(RoleRestrictedRoute);
