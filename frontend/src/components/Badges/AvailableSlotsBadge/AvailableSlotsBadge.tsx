import React from 'react';
import { useTranslation } from 'react-i18next';

import Badge from '../../UI/Badge';

import { ModulePropType } from '../../../lib/validation/propTypesValues';

interface Props {
  module: Module;
}

const AvailableSlotsBadge: React.FC<Props> = ({ module }) => {
  const { t } = useTranslation();
  const { availableSlots } = module;
  const isFilled = availableSlots === 0;

  return (
    <Badge type={isFilled ? 'primary' : 'info'}>
      {isFilled ? t('Module.Filled') : t('Module.AvailableSlots', { count: availableSlots })}
    </Badge>
  );
};

AvailableSlotsBadge.propTypes = {
  module: ModulePropType.isRequired,
};

export default AvailableSlotsBadge;
