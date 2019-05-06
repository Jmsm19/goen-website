import React, { useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';

import { AuthContext } from './AuthContext';

import DataStateReducer from '../store/reducers/dataReducer';
import { GetActivePeriod, GetModule, GetAllModules } from '../store/actions/periodActions';
import { GetUser, GetAllUsers, GetSenpaiModules } from '../store/actions/userActions';
import { GetSettings, UpdateSettings } from '../store/actions/settingActions';
import { createMap } from '../lib/utils';

const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  const initialState = {
    activePeriod: null,
    allModulesSearched: false,
    modules: createMap(),
    notFoundModules: [],
    allUsersSearched: false,
    users: createMap(),
    notFoundUsers: [],
    settings: null,
  };

  const [state, dispatch] = useReducer(DataStateReducer, initialState);

  const { activePeriod, settings } = state;
  useEffect(() => {
    if (!settings) {
      GetSettings(dispatch);
    }
  }, []);

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
    getAllUsers: () => GetAllUsers(dispatch),
    getUser: id => GetUser(id, dispatch),
    // Settings
    updateSetting: (settingName, value) => UpdateSettings(settingName, value, dispatch),
  };

  return (
    <DataContext.Provider value={{ ...state, ...functions }}>
      {!settings ? <Loading /> : children}
    </DataContext.Provider>
  );
};

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataContext, DataContextProvider };
