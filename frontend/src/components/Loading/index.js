import React from 'react';
import PropTypes from 'prop-types';

import StyledPage from './styles';
import LoadingIcon from '../UI/LoadingIcon';

const Loading = ({ text }) => (
  <StyledPage className='loading'>
    <div className='loading-container'>
      <LoadingIcon />
      <p className='text'>{text}</p>
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
