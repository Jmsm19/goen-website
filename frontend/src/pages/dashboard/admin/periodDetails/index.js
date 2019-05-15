import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePeriods } from '../../../../context/PeriodsContext';

import Loading from '../../../../components/Loading';
import PeriodDetails from '../../../../components/Period/PeriodDetails';

const PeriodDetailsPage = ({ match: { params } }) => {
  const { id } = params;
  const { t } = useTranslation();
  const { periods, getPeriod, updatePeriod, deletePeriod } = usePeriods();

  const [isSearchingUser, setIsSearchingUser] = useState(false);

  const period = periods.get(id);

  useEffect(() => {
    if (!isSearchingUser && !periods.has(id)) {
      setIsSearchingUser(true);
      getPeriod(id);
    } else if (isSearchingUser && periods.has(id)) {
      setIsSearchingUser(false);
    }
  }, [getPeriod, id, isSearchingUser, periods]);

  if (!period) {
    return <Loading text={t('Period.Searching')} />;
  }

  return (
    <div className='period-details-age'>
      <PeriodDetails period={period} deletePeriod={deletePeriod} updatePeriod={updatePeriod} />
    </div>
  );
};

PeriodDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default PeriodDetailsPage;
