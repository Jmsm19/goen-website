import React, { forwardRef } from 'react';
// import PropTypes from 'prop-types';

import StyledErrorText from './styles';

const ErrorText = forwardRef(({ error, ...rest }: ErrorTextProps, ref) => (
  <StyledErrorText ref={ref} className='error-text' {...rest}>
    {error}
  </StyledErrorText>
));

export default ErrorText;
