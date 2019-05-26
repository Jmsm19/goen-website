import { usePeriods } from '../../context/PeriodsContext';

const useActivePeriod = () => {
  const { activePeriod, periods } = usePeriods();
  return periods.get(activePeriod);
};

export default useActivePeriod;
