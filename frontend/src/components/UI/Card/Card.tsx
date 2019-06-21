import React, { forwardRef } from 'react';
// import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CardContent, CardMedia, Typography } from '@material-ui/core';
import { CardProps } from '@material-ui/core/Card';

import StyledCard from './styles';

interface Props extends UICardProps, CardProps {}

const Card = forwardRef((props: Props, ref) => {
  const { children, title, image, width, onClick, ...droppings } = props;
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
    <StyledCard ref={ref} className={localClassName} style={{ width }} onClick={onClick} {...rest}>
      <CardContent className='card-body'>
        {image && <CardMedia className='card-img-top' image={image} title={title || ''} />}

        {title && (
          <Typography className='card-title' gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </StyledCard>
  );
});

Card.defaultProps = {
  className: undefined,
  fullWidth: false,
  hoverable: false,
  image: undefined,
  title: undefined,
  onClick: () => null,
  width: undefined,
  withShadow: false,
};

// Card.propTypes = {
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
//   fullWidth: PropTypes.bool,
//   hoverable: PropTypes.bool,
//   image: PropTypes.string,
//   onClick: PropTypes.func,
//   title: PropTypes.string,
//   width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   withShadow: PropTypes.bool,
//   ...MaterialCard.propTypes,
// };

export default Card;
