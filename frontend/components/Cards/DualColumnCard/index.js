import React from 'react';
import PropTypes from 'prop-types';
import StyledDualColCard from '../../../styles/components/DualColumnCard';

function DualColumnCard({ firstColumn, secondColumn }) {
  return (
    <StyledDualColCard
      style={{
        display: 'grid',
        gridGap: 10,
      }}
    >
      <div className='first-col'>{firstColumn}</div>

      <div className='second-col'>{secondColumn}</div>
    </StyledDualColCard>
  );
}

DualColumnCard.defaultProps = {
  firstColumn: <div />,
  secondColumn: <div />,
};

DualColumnCard.propTypes = {
  firstColumn: PropTypes.node,
  secondColumn: PropTypes.node,
};

export default DualColumnCard;
