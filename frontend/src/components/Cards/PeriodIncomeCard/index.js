import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Card, CardBody, CardTitle } from 'shards-react';

import { useModules } from '../../../store/context/ModulesContext';

import { getActualIncome } from '../../Period/PeriodDetails/fns';
import { formatPrice } from '../../../lib/utils';

const PeriodIncomeCard = ({ modules }) => {
  const { t } = useTranslation();
  const { students } = useModules();

  const income = React.useMemo(() => {
    const total = getActualIncome(modules, students);
    return formatPrice(total);
  }, [modules, students]);

  return (
    <Card>
      <CardBody>
        <CardTitle>{t('Period.CurrentIncome')}</CardTitle>
        <p>{income}</p>
      </CardBody>
    </Card>
  );
};

PeriodIncomeCard.defaultProps = {
  modules: [],
};

PeriodIncomeCard.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape()),
};

export default PeriodIncomeCard;
