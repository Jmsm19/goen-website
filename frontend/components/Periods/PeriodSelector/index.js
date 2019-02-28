import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { GetData } from '../../../utils/fetch';
import { notifyError } from '../../../utils';

class PeriodSelector extends Component {
  state = {
    loading: false,
    periods: [],
  };

  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      () => {
        GetData('/period')
          .then(res => res.json())
          .then(({ data, error }) => {
            if (error) {
              throw Error(error);
            }
            this.setState({
              loading: false,
              periods: [...data],
            });
          })
          .catch(notifyError);
      },
    );
  }

  render() {
    const { t, defaultPeriod, onChange, style } = this.props;
    const { loading, periods } = this.state;

    return (
      <Select
        allowClear
        loading={loading}
        disabled={loading}
        placeholder={t('Period')}
        defaultValue={defaultPeriod}
        onChange={onChange}
        style={{ minWidth: 100, ...style }}
      >
        {periods.map(({ id, name, year }) => (
          <Select.Option key={id} value={id}>
            {name} ({year})
          </Select.Option>
        ))}
      </Select>
    );
  }
}

PeriodSelector.defaultProps = {
  defaultPeriod: undefined,
  style: {},
};

PeriodSelector.propTypes = {
  t: PropTypes.func.isRequired,
  style: PropTypes.shape(),
  defaultPeriod: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default PeriodSelector;
