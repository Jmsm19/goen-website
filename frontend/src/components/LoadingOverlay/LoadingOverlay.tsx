import React from 'react';
import PropTypes from 'prop-types';

import SpringAnimation from '../Animations/SpringAnimation';
import Loading from '../Loading';

import StyledContainer from './styles';

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

const LoadingOverlay: React.FC<Props> = ({ children, loading }) => (
  <StyledContainer className='overlay-container'>
    {children}

    <SpringAnimation animation='fadeIn'>
      {loading && (
        <div className='overlay' key='overlay'>
          <Loading />
        </div>
      )}
    </SpringAnimation>
  </StyledContainer>
);

LoadingOverlay.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoadingOverlay;
