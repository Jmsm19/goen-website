import React, { useContext } from 'react';

import Loading from '../../../../components/Loading';

import { DataContext } from '../../../../context/DataContext';

import PeriodDetails from '../../../../components/Period/PeriodDetails';

const AdminPeriodPage = props => {
  const { activePeriod, deletePeriod } = useContext(DataContext);

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
