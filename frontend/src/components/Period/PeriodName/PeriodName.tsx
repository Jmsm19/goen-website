import React from 'react';
import { useTranslation } from 'react-i18next';

import { PeriodPropType } from '../../../lib/validation/propTypesValues';

interface Props {
  period: Period;
}

const PeriodName: React.FC<Props> = ({ period }) => {
  const { t } = useTranslation();

  return <>{`${t('Period._singular')} ${period.name} - ${period.year}`}</>;
};

PeriodName.propTypes = {
  period: PeriodPropType.isRequired,
};

export default PeriodName;
