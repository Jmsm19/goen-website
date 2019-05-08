import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import AuthStateReducer from '../store/reducers/authReducer';
import { LoginUser, RegisterUser, LogoutUser, GetAuthUser } from '../store/actions/authActions';

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const initialState = {
    isAuth: !!Cookies.get('token'),
    authUser: null,
  };

  const [state, dispatch] = useReducer(AuthStateReducer, initialState);

  const login = loginData => LoginUser(loginData, dispatch);
  const register = userData => RegisterUser(userData, dispatch);
  const logout = () => LogoutUser(dispatch);
  const getAuthUser = () => GetAuthUser(dispatch);

  const { isAuth, authUser } = state;
  useEffect(() => {
    if (isAuth && !authUser) {
      getAuthUser();
    }
  }, [authUser, isAuth]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, getAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthContextProvider };
