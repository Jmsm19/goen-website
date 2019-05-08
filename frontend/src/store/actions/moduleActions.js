import actionTypes from '../types';
import { GetData } from '../../lib/utils/http';
import { createDictionaryOfIdsFromArray, createMap, createDictionaryItem } from '../../lib/utils';

export const GetModule = (id, dispatch) => {
  GetData(`modules/${id}`)
    .then(({ data }) => {
      dispatch({
        type: actionTypes.GET_MODULE,
        payload: {
          module: createMap(createDictionaryItem(data)),
        },
      });
    })
    .catch(({ response }) => {
      if (response.status === 404) {
        dispatch({
          type: actionTypes.MODULE_NOT_FOUND,
          payload: { ...response, id },
        });
      }
    });
};

export const GetAllModules = dispatch => {
  GetData(`modules`).then(({ data }) => {
    dispatch({
      type: actionTypes.GET_MODULE,
      payload: {
        module: createMap(createDictionaryOfIdsFromArray(data)),
        allModulesSearched: true,
      },
    });
  });
};
