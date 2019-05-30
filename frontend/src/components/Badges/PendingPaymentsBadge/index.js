import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Badge } from 'shards-react';

import { useModules } from '../../../store/context/ModulesContext';

import { getRegisteredStudentsCount } from '../../Period/PeriodDetails/fns';

const PendingPaymentsBadge = ({ module }) => {
  const { t } = useTranslation();
  const { students } = useModules();

  const moduleStudents = students.get(module.id) || [];

  const pendingPayments = moduleStudents.length - getRegisteredStudentsCount(moduleStudents);

  return (
    moduleStudents.length > 0 && (
      <Badge theme='secondary'>{t('Payment.PendingQty', { count: pendingPayments })}</Badge>
    )
  );
};

PendingPaymentsBadge.defaultProps = {
  module: {
    students: [],
  },
};

PendingPaymentsBadge.propTypes = {
  module: PropTypes.shape({
    students: PropTypes.arrayOf(PropTypes.shape()),
  }),
};

export default PendingPaymentsBadge;
