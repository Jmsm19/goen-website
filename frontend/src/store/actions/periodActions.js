import Cookies from 'js-cookie';

import actionTypes from '../types';
import { SendData, GetData } from '../../lib/utils/http';

export const GetActivePeriod = dispatch => {
  GetData('periods/active')
    .then(({ data }) => {
      dispatch({
        type: actionTypes.GET_ACTIVE_PERIOD,
        payload: {
          activePeriod: { ...data },
        },
      });
    })
    .catch(({ response }) => {
      if (response.status === 401) {
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
      if (response.status === 401) {
        dispatch({
          type: actionTypes.AUTH_LOGIN_FAILED,
          payload: { ...response },
        });
      }
    });
};
