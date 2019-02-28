import React from 'react';
import PropTypes from 'prop-types';
import { ModulesContextConsumer } from '../../context/ModulesContext';
import { getDisplayName } from '../../utils/index';

function withModulesContext(WrappedComponent) {
  return function wrapper(props) {
    wrapper.displayName = `WithModulesContext(${getDisplayName(WrappedComponent)})`;
    return (
      <ModulesContextConsumer>
        {context => <WrappedComponent modulesContext={{ ...context }} {...props} />}
      </ModulesContextConsumer>
    );
  };
}

withModulesContext.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withModulesContext;
