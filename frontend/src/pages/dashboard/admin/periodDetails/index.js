import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { DataContext } from '../../../../context/DataContext';
import Loading from '../../../../components/Loading';
import PeriodDetails from '../../../../components/Period/PeriodDetails';

const PeriodDetailsPage = ({ match: { params } }) => {
  const { id } = params;
  const [isSearchingUser, setIsSearchingUser] = useState(false);
  const { periods, getPeriod, deletePeriod } = useContext(DataContext);
  const { t } = useTranslation();
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
      <PeriodDetails period={period} deletePeriod={deletePeriod} />
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
