import { usePeriods } from '../../store/context/PeriodsContext';

const useActivePeriod = () => {
  const { activePeriod, periods } = usePeriods();

  if (!activePeriod) {
    return undefined;
  }

  return periods.get(activePeriod);
};

export default useActivePeriod;
