import Cookies from 'js-cookie';

import { SendData, GetData } from '../../lib/utils/http';
import { generateSnackbarConfig } from '../../lib/utils';

export const LoginUser: LoginUser = async (loginData, { dispatch, enqueueSnackbar }) => {
  dispatch({ type: 'AUTH_LOGIN' });

  try {
    const { data } = await SendData('POST', 'auth/login', loginData);
    const { token } = data;
    Cookies.set('token', token, {
      expires: 7,
      secure: process.env.NODE_ENV !== 'development',
    });

    dispatch({ type: 'AUTH_LOGIN_SUCCESS' });
  } catch ({ response }) {
    if (response.status === 401) {
      enqueueSnackbar(response.statusText, generateSnackbarConfig('error'));
    }

    dispatch({
      type: 'AUTH_LOGIN_FAILED',
      payload: { ...response },
    });
  }
};

export const RegisterUser: RegisterInModule = async (userData, { dispatch, enqueueSnackbar }) => {
  dispatch({ type: 'AUTH_REGISTER' });

  try {
    const { data } = await SendData('POST', 'auth/signup', userData);

    dispatch({
      type: 'AUTH_REGISTER_SUCCESS',
      payload: {
        message: data.message,
      },
    });
  } catch ({ response }) {
    if (response.status === 401) {
      enqueueSnackbar(response.data.error, generateSnackbarConfig('error'));
    }

    dispatch({
      type: 'AUTH_REGISTER_FAILED',
      payload: { ...response.data },
    });
  }
};

export const GetAuthUser: GetAuthUser = async ({ dispatch }) => {
  try {
    const { data } = await GetData('auth/user');

    dispatch({
      type: 'AUTH_GET_USER',
      payload: {
        user: data,
      },
    });
  } catch ({ response }) {
    if (response.status === 401) {
      Cookies.remove('token');
      dispatch({
        type: 'AUTH_LOGIN_FAILED',
        payload: { ...response },
      });
    }
  }
};

export const LogoutUser: LogoutUser = async ({ dispatch, enqueueSnackbar }) => {
  try {
    await SendData('POST', 'auth/logout');
    Cookies.remove('token');
    dispatch({ type: 'AUTH_LOGOUT' });
  } catch ({ response }) {
    if (response.status === 401) {
      Cookies.remove('token');
      enqueueSnackbar(response.statusText, generateSnackbarConfig('error'));
    }

    console.error('TCL: response', response);
  }
};

export const RegisterInModule: RegisterInModule = async (
  moduleId,
  { dispatch, enqueueSnackbar },
) => {
  dispatch({ type: 'REGISTER_IN_MODULE' });

  try {
    const { data } = await SendData('POST', `/modules/${moduleId}/register`, { id: moduleId });
    dispatch({ type: 'REGISTER_IN_MODULE_SUCCESS' });
    enqueueSnackbar(data.message, generateSnackbarConfig('success'));
  } catch ({ response: { data } }) {
    dispatch({ type: 'REGISTER_IN_MODULE_FAILED' });
    if (data.message) {
      enqueueSnackbar(data.message, generateSnackbarConfig('error'));
    }
  }
};
