import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import PendingPaymentsBadge from '../../Badges/PendingPaymentsBadge';
import AvailableSlotsBadge from '../../Badges/AvailableSlotsBadge';

import { formatHoursFromDB } from '../../../lib/utils';
import StyledCard from './styles';
import { ModulePropType } from '../../../lib/validation/propTypesValues';

interface Props {
  module: Module;
  onClick?: BtnClick;
  showPendingPayments?: boolean;
  showAvailableSlots?: boolean;
}

const ModuleSummaryCard: React.FC<Props> = ({
  module,
  onClick,
  showPendingPayments,
  showAvailableSlots,
  ...props
}) => {
  const { t } = useTranslation();

  const { schedule } = module;
  const handleClick = () => onClick && onClick(module);

  return (
    <StyledCard title={module.fullName} hoverable fullWidth onClick={handleClick} {...props}>
      {showPendingPayments && !showAvailableSlots && <PendingPaymentsBadge module={module} />}

      {showAvailableSlots && !showPendingPayments && <AvailableSlotsBadge module={module} />}

      <p>{t(schedule.day)}</p>
      <p>
        {formatHoursFromDB(schedule.from)} - {formatHoursFromDB(schedule.until)}
      </p>
    </StyledCard>
  );
};

ModuleSummaryCard.defaultProps = {
  onClick: () => null,
  showPendingPayments: false,
  showAvailableSlots: false,
};

ModuleSummaryCard.propTypes = {
  onClick: PropTypes.func,
  module: ModulePropType.isRequired,
  showPendingPayments: PropTypes.bool,
  showAvailableSlots: PropTypes.bool,
};

export default ModuleSummaryCard;
