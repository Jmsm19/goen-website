import React, { useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Loading from '../components/Loading';

import { AuthContext } from './AuthContext';

import DataStateReducer from '../store/reducers/dataReducer';
import * as periodActions from '../store/actions/periodActions';
import * as moduleActions from '../store/actions/moduleActions';
import * as userActions from '../store/actions/userActions';
import * as settingsActions from '../store/actions/settingActions';
import { createMap } from '../lib/utils';

const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const { t } = useTranslation();
  const { isAuth } = useContext(AuthContext);

  const initialState = {
    activePeriod: null,
    periods: createMap(),
    allPeriodsSearched: false,
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

  // OnMount
  useEffect(() => {
    if (!settings) {
      settingsActions.GetSettings(dispatch);
    } else if (isAuth && !activePeriod) {
      periodActions.GetActivePeriod(dispatch);
    }
  }, [activePeriod, isAuth, settings, state]);

  const helpers = { t, dispatch };
  const functions = {
    // Period
    getActivePeriod: () => periodActions.GetActivePeriod(dispatch),
    getPeriod: id => periodActions.GetPeriod(id, helpers),
    getAllPeriods: () => periodActions.GetAllPeriods(helpers),
    createPeriod: (periodData, cb) => periodActions.CreatePeriod(periodData, helpers, cb),
    deletePeriod: id => periodActions.DeletePeriod(id, helpers),
    // Module
    getAllModules: () => moduleActions.GetAllModules(dispatch),
    getModule: id => moduleActions.GetModule(id, dispatch),
    // Senpai
    getSenpaiModules: (role, id) => userActions.GetSenpaiModules(role, id, dispatch),
    // User
    getAllUsers: () => userActions.GetAllUsers(dispatch),
    getUser: id => userActions.GetUser(id, dispatch),
    // Settings
    updateSetting: (settingName, value) =>
      settingsActions.UpdateSettings(settingName, value, dispatch),
  };

  return (
    <DataContext.Provider value={{ ...state, ...functions }}>
      {!settings ? <Loading text='Loading Config...' /> : children}
    </DataContext.Provider>
  );
};

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataContext, DataContextProvider };
