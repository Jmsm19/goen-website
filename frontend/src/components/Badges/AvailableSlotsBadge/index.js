import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Badge from '../../UI/Badge';

const AvailableSlotsBadge = ({ module }) => {
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
  module: PropTypes.shape({
    availableSlots: PropTypes.number,
  }).isRequired,
};

export default AvailableSlotsBadge;
