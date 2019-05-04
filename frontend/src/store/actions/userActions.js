/* eslint-disable import/prefer-default-export */
import actionTypes from '../types';
import { GetData } from '../../lib/utils/http';
import { capitalize } from '../../lib/utils';

export const GetUser = (id, dispatch) => {
  GetData(`users/${id}`)
    .then(({ data }) => {
      dispatch({
        type: actionTypes.GET_USER,
        payload: {
          user: { ...data },
        },
      });
    })
    .catch(({ response }) => {
      if (response.status === 404) {
        dispatch({
          type: actionTypes.USER_NOT_FOUND,
          payload: { id },
        });
      }
    });
};

export const GetSenpaiModules = (role, id, dispatch) => {
  GetData(`/${role}/${id}/modules`).then(({ data }) => {
    dispatch({
      type: actionTypes.GET_SENPAI_MODULES_SUCCESS,
      payload: {
        id,
        modules: {
          [`modulesAs${capitalize(role)}`]: [...data],
        },
      },
    });
  });
};