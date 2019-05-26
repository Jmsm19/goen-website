import React from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import AuthStateReducer from '../store/reducers/authReducer';
import * as AA from '../store/actions/authActions';

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
  const { t } = useTranslation();
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const { dispatch, ...contextRest } = context;
  const helpers = { t, dispatch };

  const actions = {
    login: loginData => AA.LoginUser(loginData, dispatch),
    register: userData => AA.RegisterUser(userData, dispatch),
    logout: () => AA.LogoutUser(dispatch),
    getAuthUser: () => AA.GetAuthUser(dispatch),
    registerInModule: id => AA.RegisterInModule(id, helpers),
  };

  return {
    ...contextRest,
    ...actions,
  };
};

export { AuthProvider, useAuth };
