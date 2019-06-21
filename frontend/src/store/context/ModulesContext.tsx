import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import ModuleReducer from '../reducers/moduleReducer';
import * as MA from '../actions/moduleActions';

import { createMap } from '../../lib/utils';

const ModulesContext = React.createContext<undefined | ModuleContextValue>(undefined);

// CONTEXT PROVIDER
const ModulesProvider: React.FC<ProviderProps> = props => {
  const initialState: ModuleContextState = {
    allModulesSearched: false,
    modules: createMap(),
    notFoundModules: [],
    searchedPeriods: [],
    students: createMap(),
    schedules: createMap(),
  };

  const [state, dispatch] = React.useReducer(ModuleReducer, initialState);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return <ModulesContext.Provider value={{ ...value }} {...props} />;
};

// HOOK
const useModules = () => {
  const { t } = useTranslation();
  const context = React.useContext(ModulesContext);
  const { enqueueSnackbar } = useSnackbar();

  if (!context) {
    throw new Error('useModules must be used within ModulesProvider');
  }

  const { dispatch, state } = context;
  const helpers = { t, dispatch, enqueueSnackbar };

  const actions = {
    getAllModules: () => MA.GetAllModules(dispatch),
    getModule: (id: string) => MA.GetModule(id, dispatch),
    createModule: (moduleData: any, cb: Callbacks) => MA.CreateModule(moduleData, helpers, cb),
    getAllSchedules: () => MA.GetAllSchedules(helpers),
    updateModule: (id: string, moduleData: any, cb: Callbacks) =>
      MA.UpdateModule(id, moduleData, helpers, cb),
    deleteModule: (id: string, cb: Callbacks) => MA.DeleteModule(id, helpers, cb),
    getModulesForPeriod: (id: string) => MA.GetModulesForPeriod(id, helpers),
    getStudentsForModule: (id: string) => MA.GetStudentsForModule(id, helpers),
  };

  return {
    ...state,
    ...actions,
  };
};

export { ModulesProvider, useModules };
