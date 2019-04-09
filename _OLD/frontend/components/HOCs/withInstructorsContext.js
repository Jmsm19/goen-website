import React from 'react';
import PropTypes from 'prop-types';
import { InstructorsContextConsumer } from '../../context/InstructorsContext';
import { getDisplayName } from '../../utils/index';

function withInstructorsContext(WrappedComponent) {
  return function wrapper(props) {
    wrapper.displayName = `WithInstructorsContext(${getDisplayName(WrappedComponent)})`;
    return (
      <InstructorsContextConsumer>
        {context => <WrappedComponent instructorContext={{ ...context }} {...props} />}
      </InstructorsContextConsumer>
    );
  };
}

withInstructorsContext.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withInstructorsContext;
