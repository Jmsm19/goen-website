import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uuid from 'uuid/v4';

import { PoseGroup } from 'react-pose';
import Loading from '../../Loading';

import { FadeInTableRow, FadeInLoadingOverlay } from './animations';
import { StyledTable, StyledTableWrapper } from './styles';

const Table = ({ columns, data, noData, loading, className }) => {
  const localClassNames = classnames(['table', className]);

  const renderHeaders = () =>
    !!columns.length &&
    columns.map(({ text }) => (
      <th key={uuid()} className='table-head-row-item'>
        {text}
      </th>
    ));

  const renderData = () => {
    if (Array.isArray(data) && data.length) {
      return data.map(item => (
        <FadeInTableRow key={item.id || uuid()} className='table-body-row'>
          {!!columns.length &&
            columns.map(({ render, key }) => (
              <td key={uuid()} className='table-body-row-item'>
                {render ? render(item[key], item) : item[key]}
              </td>
            ))}
        </FadeInTableRow>
      ));
    }

    return (
      <tr>
        <td>{noData}</td>
      </tr>
    );
  };

  return (
    <StyledTableWrapper className='table-wrapper'>
      <StyledTable className={localClassNames} key='table'>
        {/* Head */}
        <thead className='table-head'>
          <tr className='table-head-row'>{renderHeaders()}</tr>
        </thead>

        {/* Body */}
        <tbody className='table-body'>{!loading && renderData()}</tbody>
      </StyledTable>

      <PoseGroup>
        {loading && (
          <FadeInLoadingOverlay className='overlay' key='overlay'>
            <Loading />
          </FadeInLoadingOverlay>
        )}
      </PoseGroup>
    </StyledTableWrapper>
  );
};

Table.defaultProps = {
  className: null,
  data: null,
  loading: false,
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
  loading: PropTypes.bool,
  noData: PropTypes.string,
};

export default Table;
