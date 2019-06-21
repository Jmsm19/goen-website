import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Select from '../../UI/Select';

import { PeriodPropType } from '../../../lib/validation/propTypesValues';

interface Props extends SelectProps {
  periods: Period[];
}

const PeriodYearSelector: React.FC<Props> = ({ name, periods, onChange, ...props }) => {
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
  periods: PropTypes.arrayOf(PeriodPropType.isRequired).isRequired,
  name: PropTypes.string.isRequired,
};

export default PeriodYearSelector;
