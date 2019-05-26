import React from 'react';
import PropTypes from 'prop-types';

import StyledGrid from './styles';

const CardGrid = ({ cardArray }) => <StyledGrid className='card-grid'>{cardArray}</StyledGrid>;

CardGrid.defaultProps = {
  cardArray: [],
};

CardGrid.propTypes = {
  cardArray: PropTypes.arrayOf(PropTypes.node),
};

export default CardGrid;
