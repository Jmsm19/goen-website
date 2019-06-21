import React from 'react';

import { usePeriods } from '../../../../store/context/PeriodsContext';

import Loading from '../../../../components/Loading';
import PeriodDetails from '../../../../components/Period/PeriodDetails';

const ActivePeriodPage: React.FC = () => {
  const { activePeriod, periods, deletePeriod } = usePeriods();

  if (!activePeriod) {
    return <Loading />;
  }

  const period = periods.get(activePeriod);

  return (
    <div className='dashboard-home'>
      {period ? (
        <PeriodDetails period={period} deletePeriod={deletePeriod} />
      ) : (
        <h1>No active Period</h1>
      )}
    </div>
  );
};

ActivePeriodPage.propTypes = {};

export default ActivePeriodPage;
