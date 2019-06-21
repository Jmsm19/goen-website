import React, { forwardRef } from 'react';
// import PropTypes from 'prop-types';

import StyledHelpText from './styles';

const HelpText = forwardRef(({ text, ...rest }: HelpTextProps, ref) => (
  <StyledHelpText ref={ref} className='help-text' {...rest}>
    {text}
  </StyledHelpText>
));

export default HelpText;
