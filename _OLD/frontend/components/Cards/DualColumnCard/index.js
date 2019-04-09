import React from 'react';
import PropTypes from 'prop-types';
import StyledDualColCard from '../../../styles/components/DualColumnCard';

function DualColumnCard({ firstColumn, secondColumn, firstColStyle, secondColStyle, style }) {
  return (
    <StyledDualColCard
      style={{
        display: 'grid',
        gridGap: 10,
        ...style,
      }}
    >
      <div className='first-col' style={{ ...firstColStyle }}>
        {firstColumn}
      </div>

      {secondColumn && (
        <div className='second-col' style={{ ...secondColStyle }}>
          {secondColumn}
        </div>
      )}
    </StyledDualColCard>
  );
}

DualColumnCard.defaultProps = {
  firstColumn: undefined,
  secondColumn: undefined,
  style: {},
  firstColStyle: {},
  secondColStyle: {},
};

DualColumnCard.propTypes = {
  firstColumn: PropTypes.node,
  secondColumn: PropTypes.node,
  style: PropTypes.shape(),
  firstColStyle: PropTypes.shape(),
  secondColStyle: PropTypes.shape(),
};

export default DualColumnCard;
