import React from 'react';
import PropTypes from 'prop-types';

import StyledPage from './styles';

const Loading = ({ text }) => (
  <StyledPage>
    <p>{text}</p>
  </StyledPage>
);

Loading.defaultProps = {
  text: 'Loading...',
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
