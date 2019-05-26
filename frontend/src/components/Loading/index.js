import React from 'react';
import PropTypes from 'prop-types';
import { Spinner3 as Spinner } from 'styled-icons/evil/Spinner3';

import StyledPage from './styles';

const Loading = ({ text }) => (
  <StyledPage className='loading'>
    <div>
      <Spinner size={80} className='spinner' />
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
