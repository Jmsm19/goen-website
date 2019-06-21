import React from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import AuthStateReducer from '../reducers/authReducer';
import * as AA from '../actions/authActions';

const AuthContext = React.createContext<undefined | AuthContextValue>(undefined);

const AuthProvider: React.FC<ProviderProps> = props => {
  const initialState: AuthContextState = {
    isAuth: !!Cookies.get('token'),
    authUser: null,
    isLoggingIn: false,
    isRegistering: false,
    signupSuccess: false,
    isRegisteringInModule: false,
    message: undefined,
  };

  const [state, dispatch] = React.useReducer(AuthStateReducer, initialState);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const { t } = useTranslation();
  const context = React.useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const { dispatch, state } = context;
  const helpers = { t, dispatch, enqueueSnackbar };

  const actions = {
    login: (loginData: any) => AA.LoginUser(loginData, helpers),
    register: (userData: any) => AA.RegisterUser(userData, helpers),
    logout: () => AA.LogoutUser(helpers),
    getAuthUser: () => AA.GetAuthUser(helpers),
    registerInModule: (id: string) => AA.RegisterInModule(id, helpers),
  };

  return {
    ...state,
    ...actions,
  };
};

export { AuthProvider, useAuth };
