import React from 'react';

import { useModules } from '../../store/context/ModulesContext';

import { sortModules } from '../../lib/utils';

/**
 * Returns the modules from a Period, if any, sorted by name
 *
 * @param {String} periodId
 * @returns {[Array, Boolean]} [sortedModules, isLoadingModules]
 */
const useSortedPeriodModules = periodId => {
  const { modules, searchedPeriods, getModulesForPeriod } = useModules();

  const periodSearched = periodId ? searchedPeriods.includes(periodId) : false;

  React.useEffect(() => {
    if (periodId && !periodSearched) {
      getModulesForPeriod(periodId);
    }
  }, [getModulesForPeriod, periodId, periodSearched]);

  const modulesArr = React.useMemo(() => {
    const arr = [];
    if (periodId) {
      modules.forEach(module => {
        if (module.period.id === periodId) {
          arr.push(module);
        }
      });
    }
    return arr;
  }, [modules, periodId]);

  const sortedModules = React.useMemo(() => {
    if (periodId) {
      return sortModules(modulesArr);
    }
    return [];
  }, [modulesArr, periodId]);

  return [sortedModules, !periodSearched];
};

export default useSortedPeriodModules;
