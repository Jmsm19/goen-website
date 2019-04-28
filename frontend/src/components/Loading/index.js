import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'styled-icons/fa-solid/Spinner';

import StyledPage from './styles';

const Loading = ({ text }) => (
  <StyledPage className='loading'>
    <div>
      {/* TODO: Look for a better icon */}
      <Spinner size={80} className='spinner' />
      <p>{text}</p>
    </div>
  </StyledPage>
);

Loading.defaultProps = {
  text: '',
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
