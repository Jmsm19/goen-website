import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import StyledErrorField from './styles';

const ErrorField = forwardRef(({ error }, ref) => (
  <StyledErrorField ref={ref} className='error-field'>
    {error}
  </StyledErrorField>
));

ErrorField.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorField;
