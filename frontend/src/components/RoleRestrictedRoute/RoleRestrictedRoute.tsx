import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';

import { useAuth } from '../../store/context/AuthContext';

import { capitalize } from '../../lib/utils';
import routes from '../../lib/config/routes';

interface RoleRestrictedRouteProps {
  path: string;
  component: React.FC<RouteComponentProps> | React.ComponentClass<RouteComponentProps>;
  requiredRole?: RoleNames;
}

const RoleRestrictedRoute = ({
  path,
  component: Component,
  requiredRole,
}: RoleRestrictedRouteProps) => {
  const { authUser } = useAuth();

  return (
    <Route
      exact
      path={path}
      render={rProps => {
        if (requiredRole) {
          const { location } = rProps;
          const upperCaseRole = capitalize(requiredRole);

          // @ts-ignore
          if (!authUser[`is${upperCaseRole}`] && location.pathname !== routes.dashboard.home) {
            return <Redirect to={routes.dashboard.home} />;
          }
        }

        return <Component {...rProps} />;
      }}
    />
  );
};

RoleRestrictedRoute.defaultProps = {
  requiredRole: undefined,
};

RoleRestrictedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]).isRequired,
  requiredRole: PropTypes.oneOf(['admin', 'instructor', 'assistant', 'student']),
};

// @ts-ignore
export default withRouter(RoleRestrictedRoute);
