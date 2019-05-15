import React from 'react';
import Cookies from 'js-cookie';

import AuthStateReducer from '../store/reducers/authReducer';
import { LoginUser, RegisterUser, LogoutUser, GetAuthUser } from '../store/actions/authActions';

const AuthContext = React.createContext();

const AuthProvider = props => {
  const initialState = {
    isAuth: !!Cookies.get('token'),
    authUser: null,
  };

  const [state, dispatch] = React.useReducer(AuthStateReducer, initialState);
  const { isAuth, authUser } = state;

  const value = React.useMemo(
    () => ({
      isAuth,
      authUser,
      dispatch,
    }),
    [isAuth, authUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const { dispatch, ...contextRest } = context;

  const actions = {
    login: loginData => LoginUser(loginData, dispatch),
    register: userData => RegisterUser(userData, dispatch),
    logout: () => LogoutUser(dispatch),
    getAuthUser: () => GetAuthUser(dispatch),
  };

  return {
    ...contextRest,
    ...actions,
  };
};

export { AuthProvider, useAuth };
