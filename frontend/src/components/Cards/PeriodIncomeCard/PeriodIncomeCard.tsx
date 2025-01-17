import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../store/context/ModulesContext';

import Card from '../../UI/Card';

import { getActualIncome } from '../../Period/PeriodDetails/fns';
import { formatPrice } from '../../../lib/utils';
import { ModulePropType } from '../../../lib/validation/propTypesValues';

interface Props {
  modules?: Module[];
}

const PeriodIncomeCard: React.FC<Props> = ({ modules }) => {
  const { t } = useTranslation();
  const { students } = useModules();

  const income = React.useMemo(() => {
    const total = getActualIncome(modules, students);
    return formatPrice(total);
  }, [modules, students]);

  return (
    <Card title={t('Period.CurrentIncome')} fullWidth>
      <p>{income}</p>
    </Card>
  );
};

PeriodIncomeCard.defaultProps = {
  modules: [],
};

PeriodIncomeCard.propTypes = {
  modules: PropTypes.arrayOf(ModulePropType.isRequired),
};

export default PeriodIncomeCard;
