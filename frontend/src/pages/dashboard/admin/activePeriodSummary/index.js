import React from 'react';

import Loading from '../../../../components/Loading';

import PeriodDetails from '../../../../components/Period/PeriodDetails';
import usePeriodDataContext from '../../../../hooks/usePeriodDataContext';

const AdminPeriodPage = props => {
  const { activePeriod, periods, deletePeriod } = usePeriodDataContext();

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
