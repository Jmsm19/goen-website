import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../context/ModulesContext';

import Select from '../../UI/Select';
import { formatHoursFromDB } from '../../../lib/utils';

const ScheduleSelector = ({ name, onChange, ...props }) => {
  const { t } = useTranslation();
  const { schedules } = useModules();

  const scheduleOptions = React.useMemo(
    () =>
      [...schedules.values()].map(({ id, day, from, until }) => ({
        text: `${t(day)} - (${formatHoursFromDB(from)} - ${formatHoursFromDB(until)})`,
        value: id,
      })),
    [schedules, t],
  );

  return (
    <Select
      loading={!schedules.size}
      className='schedule-select'
      name={name}
      options={scheduleOptions}
      onChange={onChange}
      defaultSelected
      {...props}
    />
  );
};

ScheduleSelector.defaultProps = {
  defaultSelected: null,
};

ScheduleSelector.propTypes = {
  defaultSelected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ScheduleSelector;
