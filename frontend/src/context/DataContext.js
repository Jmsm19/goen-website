import React, { useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from './AuthContext';

import DataStateReducer from '../store/reducers/dataReducer';
import { GetActivePeriod, GetModule, GetAllModules } from '../store/actions/periodActions';
import { GetUser, GetSenpaiModules } from '../store/actions/userActions';
import { createMap } from '../lib/utils';

const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  const initialState = {
    activePeriod: null,
    allModulesSearched: false,
    modules: createMap(),
    notFoundModules: [],
    users: createMap(),
    notFoundUsers: [],
  };

  const [state, dispatch] = useReducer(DataStateReducer, initialState);

  const { activePeriod } = state;
  useEffect(() => {
    if (isAuth && !activePeriod) {
      GetActivePeriod(dispatch);
    }
  }, [isAuth]);

  const functions = {
    // Period
    getActivePeriod: () => GetActivePeriod(dispatch),
    // Module
    getAllModules: () => GetAllModules(dispatch),
    getModule: id => GetModule(id, dispatch),
    // Senpai
    getSenpaiModules: (role, id) => GetSenpaiModules(role, id, dispatch),
    // User
    getUser: id => GetUser(id, dispatch),
  };

  return <DataContext.Provider value={{ ...state, ...functions }}>{children}</DataContext.Provider>;
};

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataContext, DataContextProvider };
