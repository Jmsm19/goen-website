import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { formatHoursFromDB } from '../../../lib/utils';
import StyledCard from './styles';
import { getRegisteredStudentsInModule } from '../../../store/actions/fns';

const ModuleSummaryCard = ({ module, onClick, ...props }) => {
  const { t } = useTranslation();

  const { schedule } = module;
  const handleClick = () => onClick(module);
  const qtyOfSsWithPendingPayment = module.students.length - getRegisteredStudentsInModule(module);

  return (
    <StyledCard title={module.fullName} hoverable fullWidth onClick={handleClick} {...props}>
      {qtyOfSsWithPendingPayment > 0 && (
        <p className='bubble'>{t('Payment.PendingQty', { count: qtyOfSsWithPendingPayment })}</p>
      )}
      <p>{t(schedule.day)}</p>
      <p>
        {formatHoursFromDB(schedule.from)} - {formatHoursFromDB(schedule.until)}
      </p>
    </StyledCard>
  );
};

ModuleSummaryCard.defaultProps = {
  onClick: () => null,
};

ModuleSummaryCard.propTypes = {
  onClick: PropTypes.func,
  module: PropTypes.shape({
    schedule: PropTypes.shape({
      day: PropTypes.string,
      from: PropTypes.string,
      until: PropTypes.string,
    }).isRequired,
    students: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }).isRequired,
};

export default ModuleSummaryCard;
