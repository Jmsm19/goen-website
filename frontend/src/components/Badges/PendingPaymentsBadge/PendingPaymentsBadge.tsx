import React from 'react';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../store/context/ModulesContext';

import Badge from '../../UI/Badge';

import { getRegisteredStudentsCount } from '../../Period/PeriodDetails/fns';

interface Props {
  module: Module;
}

const PendingPaymentsBadge = ({ module }: Props) => {
  const { t } = useTranslation();
  const { students } = useModules();

  const moduleStudents = students.get(module.id) || [];

  const pendingPayments = moduleStudents.length - getRegisteredStudentsCount(moduleStudents);

  return (
    <>
      {moduleStudents.length > 0 && (
        <Badge type='primary'>{t('Payment.PendingQty', { count: pendingPayments })}</Badge>
      )}
    </>
  );
};

export default PendingPaymentsBadge;
