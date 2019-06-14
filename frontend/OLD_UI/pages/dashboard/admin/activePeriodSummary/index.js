import React from 'react';

import { usePeriods } from '../../../../store/context/PeriodsContext';

import Loading from '../../../../components/Loading';
import PeriodDetails from '../../../../components/Period/PeriodDetails';

const AdminPeriodPage = props => {
  const { activePeriod, periods, deletePeriod } = usePeriods();

  if (!activePeriod) {
    return <Loading />;
  }

  const period = periods.get(activePeriod);

  return (
    <div className='dashboard-home'>
      <PeriodDetails period={period} deletePeriod={deletePeriod} />
    </div>
  );
};

AdminPeriodPage.propTypes = {};

export default AdminPeriodPage;
