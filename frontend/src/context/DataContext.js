import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import DataStateReducer from '../store/reducers/dataReducer';
import { GetActivePeriod } from '../store/actions/periodActions';

const DataContext = React.createContext();

const DataContextProvider = ({ children }) => {
  const initialState = {};

  const [state, dispatch] = useReducer(DataStateReducer, initialState);

  const getActivePeriod = () => GetActivePeriod(dispatch);

  return (
    <DataContext.Provider value={{ ...state, getActivePeriod }}>{children}</DataContext.Provider>
  );
};

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataContext, DataContextProvider };
