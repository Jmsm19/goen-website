import React from 'react';
import { useTranslation } from 'react-i18next';

import { getClanImageAddress, formatHoursFromDB } from '../../../../lib/utils';
import { ModulePropType } from '../../../../lib/validation/propTypesValues';
import StyledContainer from './styles';

interface Props {
  module: Module;
}

const ModuleDetailsHeader: React.FC<Props> = ({ module }) => {
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
  module: ModulePropType.isRequired,
};

export default ModuleDetailsHeader;
