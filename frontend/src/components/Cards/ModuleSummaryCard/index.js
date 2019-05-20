import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import PendingPaymentsBadge from '../../Badges/PendingPaymentsBadge';

import { formatHoursFromDB } from '../../../lib/utils';
import StyledCard from './styles';

const ModuleSummaryCard = ({
  module,
  onClick,
  showPendingPayments,
  showAvailableSlots,
  ...props
}) => {
  const { t } = useTranslation();

  const { schedule } = module;
  const handleClick = () => onClick(module);

  return (
    <StyledCard title={module.fullName} hoverable fullWidth onClick={handleClick} {...props}>
      {showPendingPayments && !showAvailableSlots && <PendingPaymentsBadge module={module} />}
      <p>{t(schedule.day)}</p>
      <p>
        {formatHoursFromDB(schedule.from)} - {formatHoursFromDB(schedule.until)}
      </p>
    </StyledCard>
  );
};

ModuleSummaryCard.defaultProps = {
  onClick: () => null,
  module: {
    students: [],
  },
  showPendingPayments: false,
  showAvailableSlots: false,
};

ModuleSummaryCard.propTypes = {
  onClick: PropTypes.func,
  module: PropTypes.shape({
    schedule: PropTypes.shape({
      day: PropTypes.string,
      from: PropTypes.string,
      until: PropTypes.string,
    }).isRequired,
    students: PropTypes.arrayOf(PropTypes.shape()),
  }),
  showPendingPayments: PropTypes.bool,
  showAvailableSlots: PropTypes.bool,
};

export default ModuleSummaryCard;
