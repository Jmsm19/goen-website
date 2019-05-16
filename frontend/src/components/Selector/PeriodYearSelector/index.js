import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Select from '../../UI/Select';

const PeriodYearSelector = ({ name, periods, onChange, ...props }) => {
  const { t } = useTranslation();

  const yearOptions = useMemo(() => {
    const years = periods.map(period => String(period.year));
    const options = [...new Set(years)].map(year => ({
      text: year,
      value: year,
    }));
    return [
      {
        text: t('Filter.ShowAll'),
        value: '',
      },
      ...options,
    ];
  }, [periods, t]);

  return <Select name={name} options={yearOptions} onChange={onChange} {...props} />;
};

PeriodYearSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  periods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  name: PropTypes.string.isRequired,
};

export default PeriodYearSelector;
