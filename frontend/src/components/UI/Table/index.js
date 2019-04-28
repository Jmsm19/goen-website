import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uuid from 'uuid/v4';

import { SlideInTableRow } from './animations';
import StyledTable from './styles';

const Table = ({ columns, data, noData, className }) => {
  const localClassNames = classnames(['table', className]);

  const renderHeaders = () =>
    !!columns.length &&
    columns.map(({ text }) => (
      <th key={uuid()} className='table-head-row-item'>
        {text}
      </th>
    ));

  const renderData = () => {
    if (data.length) {
      return data.map(item => (
        <SlideInTableRow key={uuid()} className='table-body-row'>
          {!!columns.length &&
            columns.map(({ render, key }) => (
              <td key={uuid()} className='table-body-row-item'>
                {render ? render(item[key], item) : item[key]}
              </td>
            ))}
        </SlideInTableRow>
      ));
    }

    return <p>{noData}</p>;
  };

  return (
    <div className='table-wrapper' style={{ overflowX: 'auto', padding: '0 2px' }}>
      <StyledTable className={localClassNames} key='table'>
        {/* Head */}
        <thead className='table-head'>
          <tr className='table-head-row'>{renderHeaders()}</tr>
        </thead>

        {/* Body */}
        <tbody className='table-body'>{renderData()}</tbody>
      </StyledTable>
    </div>
  );
};

Table.defaultProps = {
  className: null,
  data: null,
  noData: 'No data',
};

Table.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      render: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()),
  noData: PropTypes.string,
};

export default Table;
