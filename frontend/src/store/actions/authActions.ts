import Cookies from 'js-cookie';

import actionTypes from '../types';
import { SendData, GetData } from '../../lib/utils/http';
import { generateSnackbarConfig } from '../../lib/utils';

export const LoginUser = async (loginData, { dispatch, enqueueSnackbar }) => {
  dispatch({ type: actionTypes.AUTH_LOGIN });

  try {
    const { data } = await SendData('post', 'auth/login', loginData);
    const { token } = data;
    Cookies.set('token', token, {
      expires: 7,
      secure: process.env.NODE_ENV !== 'development',
    });

    dispatch({ type: actionTypes.AUTH_LOGIN_SUCCESS });
  } catch ({ response }) {
    if (response.status === 401) {
      enqueueSnackbar(response.statusText, generateSnackbarConfig('error'));
    }

    dispatch({
      type: actionTypes.AUTH_LOGIN_FAILED,
      payload: { ...response },
    });
  }
};

export const RegisterUser = async (userData, { dispatch, enqueueSnackbar }) => {
  dispatch({ type: actionTypes.AUTH_REGISTER });

  try {
    const { data } = await SendData('post', 'auth/signup', userData);

    dispatch({
      type: actionTypes.AUTH_REGISTER_SUCCESS,
      payload: {
        message: data.message,
      },
    });
  } catch ({ response }) {
    if (response.status === 401) {
      enqueueSnackbar(response.data.error, generateSnackbarConfig('error'));
    }

    dispatch({
      type: actionTypes.AUTH_REGISTER_FAILED,
      payload: { ...response.data },
    });
  }
};

export const GetAuthUser = async ({ dispatch }) => {
  try {
    const { data } = await GetData('auth/user');

    dispatch({
      type: actionTypes.AUTH_GET_USER,
      payload: {
        user: data,
      },
    });
  } catch ({ response }) {
    if (response.status === 401) {
      Cookies.remove('token');
      dispatch({
        type: actionTypes.AUTH_LOGIN_FAILED,
        payload: { ...response },
      });
    }
  }
};

export const LogoutUser = async ({ dispatch }) => {
  try {
    await SendData('POST', 'auth/logout');
    Cookies.remove('token');
    dispatch({ type: actionTypes.AUTH_LOGOUT });
  } catch ({ response }) {
    Cookies.remove('token');
    console.error('TCL: response', response);
  }
};

export const RegisterInModule = async (moduleId, { dispatch, enqueueSnackbar }) => {
  dispatch({ type: actionTypes.REGISTER_IN_MODULE });

  try {
    const { data } = await SendData('POST', `/modules/${moduleId}/register`, { id: moduleId });
    dispatch({ type: actionTypes.REGISTER_IN_MODULE_SUCCESS });
    enqueueSnackbar(data.message, generateSnackbarConfig('success'));
  } catch ({ response: { data } }) {
    dispatch({ type: actionTypes.REGISTER_IN_MODULE_FAILED });
    if (data.message) {
      enqueueSnackbar(data.message, generateSnackbarConfig('error'));
    }
  }
};
