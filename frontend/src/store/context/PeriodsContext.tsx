import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { useAuth } from './AuthContext';
import PeriodReducer from '../reducers/periodReducer';
import * as PA from '../actions/periodActions';

import { createMap } from '../../lib/utils';

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
  const { activePeriod } = state;

  React.useEffect(() => {
    if (isAuth && !activePeriod) {
      PA.GetActivePeriod(dispatch);
    }
  }, [activePeriod, isAuth]);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return <PeriodsContext.Provider value={value} {...props} />;
};

// HOOK
const usePeriods = () => {
  const { t } = useTranslation();
  const context = React.useContext(PeriodsContext);
  const { enqueueSnackbar } = useSnackbar();

  if (!context) {
    throw new Error('useInstructor must be used within PeriodsProvider');
  }

  const { dispatch, state } = context;
  const helpers = { t, dispatch, enqueueSnackbar };

  const actions = {
    getActivePeriod: () => PA.GetActivePeriod(dispatch),
    getPeriod: id => PA.GetPeriod(id, helpers),
    getAllPeriods: () => PA.GetAllPeriods(helpers),
    createPeriod: (periodData, cb) => PA.CreatePeriod(periodData, helpers, cb),
    updatePeriod: (id, periodData, cb) => PA.UpdatePeriod(id, periodData, helpers, cb),
    deletePeriod: id => PA.DeletePeriod(id, helpers),
  };

  return {
    ...state,
    ...actions,
  };
};

export { PeriodsProvider, usePeriods };
