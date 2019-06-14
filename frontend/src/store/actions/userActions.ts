import actionTypes from '../types';
import { GetData } from '../../lib/utils/http';
import {
  capitalize,
  createMap,
  createDictionaryItem,
  createDictionaryOfIdsFromArray,
} from '../../lib/utils';

export const GetUser = async (id, dispatch) => {
  try {
    const { data } = await GetData(`users/${id}`);
    dispatch({
      type: actionTypes.GET_USER,
      payload: {
        user: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    if (response.status === 404) {
      dispatch({
        type: actionTypes.USER_NOT_FOUND,
        payload: { id },
      });
    }
  }
};

export const GetAllUsers = async dispatch => {
  try {
    const { data } = await GetData(`users`);
    dispatch({
      type: actionTypes.GET_USER,
      payload: {
        user: createMap(createDictionaryOfIdsFromArray(data)),
        allUsersSearched: true,
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};

export const GetSenpaiModules = async (role, id, dispatch) => {
  try {
    const { data } = await GetData(`/${role}/${id}/modules`);
    dispatch({
      type: actionTypes.GET_SENPAI_MODULES,
      payload: {
        id,
        modules: {
          [`modulesAs${capitalize(role)}`]: [...data],
        },
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};
