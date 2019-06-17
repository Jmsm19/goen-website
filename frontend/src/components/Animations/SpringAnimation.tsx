import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

import { FadeInSpring, SlideUpSpring, SlideDownSpring } from '.';

interface Props {
  children: React.ReactNode;
  animation: 'slideUp' | 'slideDown' | 'fadeIn';
}

// @ts-ignore
const SpringAnimation: React.FC<Props> = ({ children, animation }) => {
  let animationStyle = {};

  switch (animation) {
    case 'fadeIn':
      animationStyle = FadeInSpring;
      break;
    case 'slideUp':
      animationStyle = SlideUpSpring;
      break;
    case 'slideDown':
      animationStyle = SlideDownSpring;
      break;
    default:
      break;
  }

  const style = useSpring(animationStyle);

  return (
    <animated.div style={style} className='animation-wrapper'>
      {children}
    </animated.div>
  );
};

// @ts-ignore
SpringAnimation.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.any]).isRequired,
  animation: PropTypes.oneOf(['slideUp', 'slideDown', 'fadeIn']).isRequired,
};

export default SpringAnimation;
