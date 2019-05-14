import React from 'react';

import Loading from '../../../../components/Loading';

import PeriodDetails from '../../../../components/Period/PeriodDetails';
import usePeriodDataContext from '../../../../hooks/usePeriodDataContext';

const AdminPeriodPage = props => {
  const { activePeriod, deletePeriod } = usePeriodDataContext();

  if (!activePeriod) {
    return <Loading />;
  }

  return (
    <div className='dashboard-home'>
      <PeriodDetails period={activePeriod} deletePeriod={deletePeriod} />
    </div>
  );
};

AdminPeriodPage.propTypes = {};

export default AdminPeriodPage;
