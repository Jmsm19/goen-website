import React from 'react';
import { useTranslation } from 'react-i18next';

import ModuleReducer from '../store/reducers/moduleReducer';
import * as MA from '../store/actions/moduleActions';

import { createMap } from '../lib/utils';

const ModulesContext = React.createContext();

// CONTEXT PROVIDER
const ModulesProvider = props => {
  const initialState = {
    allModulesSearched: false,
    modules: createMap(),
    notFoundModules: [],
    schedules: createMap(),
  };

  const [state, dispatch] = React.useReducer(ModuleReducer, initialState);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return <ModulesContext.Provider value={value} {...props} />;
};

// HOOK
const useModules = () => {
  const { t } = useTranslation();
  const context = React.useContext(ModulesContext);

  if (!context) {
    throw new Error('useModules must be used within ModulesProvider');
  }

  const { dispatch, state } = context;
  const helpers = { t, dispatch };

  const actions = {
    getAllModules: () => MA.GetAllModules(dispatch),
    getModule: id => MA.GetModule(id, dispatch),
    createModule: (moduleData, cb) => MA.CreateModule(moduleData, helpers, cb),
    getAllSchedules: () => MA.GetAllSchedules(helpers),
    updateModule: (id, moduleData, cb) => MA.UpdateModule(id, moduleData, helpers, cb),
    deleteModule: (id, cb) => MA.DeleteModule(id, helpers, cb),
  };

  return {
    ...state,
    ...actions,
  };
};

export { ModulesProvider, useModules };
