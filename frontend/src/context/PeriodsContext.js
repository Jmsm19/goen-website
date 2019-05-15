import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from './AuthContext';
import PeriodReducer from '../store/reducers/periodReducer';
import * as PA from '../store/actions/periodActions';

import { createMap } from '../lib/utils';

const PeriodsContext = React.createContext();

// CONTEXT PROVIDER
const PeriodsProvider = props => {
  const { isAuth } = useAuth();
  const initialState = {
    activePeriod: null,
    periods: createMap(),
    allPeriodsSearched: false,
  };

  const [state, dispatch] = React.useReducer(PeriodReducer, initialState);
  const { activePeriod, periods, allPeriodsSearched } = state;

  React.useEffect(() => {
    if (isAuth && !activePeriod) {
      PA.GetActivePeriod(dispatch);
    }
  }, [activePeriod, isAuth]);

  const value = React.useMemo(
    () => ({
      activePeriod,
      periods,
      allPeriodsSearched,
      dispatch,
    }),
    [activePeriod, periods, allPeriodsSearched],
  );
  return <PeriodsContext.Provider value={value} {...props} />;
};

// HOOK
const usePeriods = () => {
  const { t } = useTranslation();
  const context = React.useContext(PeriodsContext);

  if (!context) {
    throw new Error('useInstructor must be used within PeriodsProvider');
  }

  const { dispatch, ...contextRest } = context;
  const helpers = { t, dispatch };

  const actions = {
    getActivePeriod: () => PA.GetActivePeriod(dispatch),
    getPeriod: id => PA.GetPeriod(id, helpers),
    getAllPeriods: () => PA.GetAllPeriods(helpers),
    createPeriod: (periodData, cb) => PA.CreatePeriod(periodData, helpers, cb),
    updatePeriod: (id, periodData, cb) => PA.UpdatePeriod(id, periodData, helpers, cb),
    deletePeriod: id => PA.DeletePeriod(id, helpers),
  };

  return {
    ...contextRest,
    ...actions,
  };
};

export { PeriodsProvider, usePeriods };
