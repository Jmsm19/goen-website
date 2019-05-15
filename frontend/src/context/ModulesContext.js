import React from 'react';
import { createMap } from '../lib/utils';

import ModuleReducer from '../store/reducers/moduleReducer';
import * as MA from '../store/actions/moduleActions';

const ModulesContext = React.createContext();

// CONTEXT PROVIDER
const ModulesProvider = props => {
  const initialState = {
    allModulesSearched: false,
    modules: createMap(),
    notFoundModules: [],
  };

  const [state, dispatch] = React.useReducer(ModuleReducer, initialState);
  const { allModulesSearched, modules, notFoundModules } = state;

  const value = React.useMemo(
    () => ({
      allModulesSearched,
      modules,
      notFoundModules,
      dispatch,
    }),
    [allModulesSearched, modules, notFoundModules],
  );
  return <ModulesContext.Provider value={value} {...props} />;
};

// HOOK
const useModules = () => {
  const context = React.useContext(ModulesContext);

  if (!context) {
    throw new Error('useModules must be used within ModulesProvider');
  }

  const { dispatch, ...contextRest } = context;

  const actions = {
    getAllModules: () => MA.GetAllModules(dispatch),
    getModule: id => MA.GetModule(id, dispatch),
  };

  return {
    ...contextRest,
    ...actions,
  };
};

export { ModulesProvider, useModules };
