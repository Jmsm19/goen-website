import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { getClanImageAddress, formatHoursFromDB } from '../../../../lib/utils';
import StyledContainer from './styles';

const ModuleDetailsHeader = ({ module }) => {
  const { t } = useTranslation();

  const { fullName, schedule, clan } = module;

  return (
    <StyledContainer className='module-summary'>
      {!!clan && <img src={getClanImageAddress(clan.name)} alt={clan.name} />}
      <div className='module-info'>
        <h1 className='module-name'>{fullName}</h1>
        <p className='module-schedule'>
          {t(schedule.day)} ({formatHoursFromDB(schedule.from)} -{' '}
          {formatHoursFromDB(schedule.until)})
        </p>
      </div>
    </StyledContainer>
  );
};

ModuleDetailsHeader.propTypes = {
  module: PropTypes.shape({
    clan: PropTypes.shape({
      name: PropTypes.string,
    }),
    schedule: PropTypes.shape({
      day: PropTypes.string,
      from: PropTypes.string,
      until: PropTypes.string,
    }),
    fullName: PropTypes.string,
  }).isRequired,
};

export default ModuleDetailsHeader;
