import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledCard from './styles';

const Card = forwardRef((props, ref) => {
  const { children, title, image, width, ...droppings } = props;
  const { fullWidth, withShadow, hoverable, className, ...rest } = droppings;

  const localClassName = classnames(
    ['card'],
    {
      'card-full-width': !!fullWidth,
      'card-shadow': !!withShadow,
      'card-hoverable': !!hoverable,
    },
    [className],
  );

  return (
    <StyledCard ref={ref} className={localClassName} style={{ width }} {...rest}>
      {image && <img className='card-img-top' src={image} alt={title} />}
      <div className='card-body'>
        {title && <h5 className='card-title'>{title}</h5>}
        {children}
      </div>
    </StyledCard>
  );
});

Card.defaultProps = {
  className: null,
  fullWidth: false,
  hoverable: false,
  image: null,
  title: null,
  width: null,
  withShadow: false,
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  hoverable: PropTypes.bool,
  image: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withShadow: PropTypes.bool,
};

export default Card;
