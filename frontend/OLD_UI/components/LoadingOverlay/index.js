import React from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';

import Loading from '../Loading';

import FadeInLoadingOverlay from './animations';
import StyledContainer from './styles';

const LoadingOverlay = ({ children, loading }) => (
  <StyledContainer className='overlay-container'>
    {children}
    <PoseGroup>
      {loading && (
        <FadeInLoadingOverlay className='overlay' key='overlay'>
          <Loading />
        </FadeInLoadingOverlay>
      )}
    </PoseGroup>
  </StyledContainer>
);

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoadingOverlay;
