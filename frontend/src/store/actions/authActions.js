import Cookies from 'js-cookie';

import actionTypes from '../types';
import { SendData, GetData } from '../../lib/utils/http';

export const LoginUser = (loginData, dispatch) =>
  SendData('post', 'auth/login', loginData)
    .then(({ data }) => {
      if (data.error) {
        throw new Error(data.error);
      }

      const { token } = data;
      Cookies.set('token', token, {
        expires: 7,
        secure: process.env.NODE_ENV !== 'development',
      });

      dispatch({
        type: actionTypes.AUTH_LOGIN_SUCCESS,
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: actionTypes.AUTH_LOGIN_FAILED,
        payload: { ...response },
      });
    });

export const RegisterUser = (userData, dispatch) => {
  SendData('post', 'auth/signup', userData)
    .then(({ data, response }) => {
      if (response) {
        throw new Error(response);
      }

      dispatch({
        type: actionTypes.AUTH_REGISTER_SUCCESS,
        payload: { ...data },
      });
    })
    .catch(error => {
      dispatch({
        type: actionTypes.AUTH_REGISTER_FAILED,
        payload: { ...error },
      });
    });
};

export const GetAuthUser = dispatch => {
  GetData('auth/user')
    .then(({ data }) => {
      dispatch({
        type: actionTypes.AUTH_GET_USER,
        payload: {
          user: data,
        },
      });
    })
    .catch(({ response }) => {
      if (response.status === 401) {
        Cookies.remove('token');
        dispatch({
          type: actionTypes.AUTH_LOGIN_FAILED,
          payload: { ...response },
        });
      }
    });
};

export const LogoutUser = dispatch => {
  SendData('POST', 'auth/logout')
    .then(({ data }) => {
      Cookies.remove('token');
      dispatch({ type: actionTypes.AUTH_LOGOUT });
    })
    .catch(({ response }) => {
      Cookies.remove('token');
      if (response.status === 401) {
        dispatch({
          type: actionTypes.AUTH_LOGIN_FAILED,
          payload: { ...response },
        });
      }
    });
};
