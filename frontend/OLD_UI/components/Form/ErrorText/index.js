import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import StyledErrorText from './styles';

const ErrorText = forwardRef(({ error }, ref) => (
  <StyledErrorText ref={ref} className='error-text'>
    {error}
  </StyledErrorText>
));

ErrorText.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorText;
