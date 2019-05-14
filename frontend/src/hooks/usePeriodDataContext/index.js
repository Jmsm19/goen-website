import { useContext } from 'react';

import { DataContext } from '../../context/DataContext';

const usePeriodDataContext = () => {
  const {
    // State
    activePeriod,
    periods,
    allPeriodsSearched,
    // Actions
    getActivePeriod,
    getPeriod,
    getAllPeriods,
    createPeriod,
    deletePeriod,
  } = useContext(DataContext);

  return {
    activePeriod,
    periods,
    allPeriodsSearched,
    getActivePeriod,
    getPeriod,
    getAllPeriods,
    createPeriod,
    deletePeriod,
  };
};

export default usePeriodDataContext;
