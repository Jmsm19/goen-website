import { toast } from 'react-toastify';

import actionTypes from '../types';
import { GetData, SendData } from '../../lib/utils/http';
import {
  createDictionaryOfIdsFromArray,
  createMap,
  createDictionaryItem,
  callFunctions,
} from '../../lib/utils';

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
  GetData('modules').then(({ data }) => {
    dispatch({
      type: actionTypes.GET_MODULE,
      payload: {
        module: createMap(createDictionaryOfIdsFromArray(data)),
        allModulesSearched: true,
      },
    });
  });
};

export const CreateModule = (moduleData, { t, dispatch }, cb) => {
  SendData('POST', 'modules', moduleData).then(({ data }) => {
    toast.success(t('Module.Created'));

    callFunctions(cb);

    dispatch({
      type: actionTypes.CREATE_MODULE,
      payload: {
        module: createMap(createDictionaryItem(data)),
      },
    });
  });
};

export const GetAllSchedules = ({ dispatch }) => {
  GetData('schedules').then(({ data }) => {
    dispatch({
      type: actionTypes.GET_ALL_SCHEDULES,
      payload: {
        schedules: createMap(createDictionaryOfIdsFromArray(data)),
      },
    });
  });
};

export const UpdateModule = (id, moduleData, { dispatch, t }, cb) => {
  SendData('PUT', `modules/${id}`, moduleData).then(({ data }) => {
    toast.success(t('Module.Updated'));
    callFunctions(cb);
    dispatch({
      type: actionTypes.UPDATE_MODULE,
      payload: {
        module: createMap(createDictionaryItem(data)),
      },
    });
  });
};

export const DeleteModule = (id, { dispatch }, cb) => {
  SendData('DELETE', `modules/${id}`).then(({ data }) => {
    toast.success(data.message);
    callFunctions(cb);

    dispatch({
      type: actionTypes.DELETE_MODULE,
      payload: {
        moduleId: id,
      },
    });
  });
};
