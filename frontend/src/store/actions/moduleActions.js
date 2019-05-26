import { toast } from 'react-toastify';

import actionTypes from '../types';
import { GetData, SendData } from '../../lib/utils/http';
import {
  createDictionaryOfIdsFromArray,
  createMap,
  createDictionaryItem,
  callFunctions,
} from '../../lib/utils';

export const GetModule = async (id, dispatch) => {
  try {
    const { data } = await GetData(`modules/${id}`);
    dispatch({
      type: actionTypes.GET_MODULE,
      payload: {
        module: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    if (response.status === 404) {
      dispatch({
        type: actionTypes.MODULE_NOT_FOUND,
        payload: { ...response, id },
      });
    }
  }
};

export const GetAllModules = async dispatch => {
  try {
    const { data } = await GetData('modules');
    dispatch({
      type: actionTypes.GET_MODULE,
      payload: {
        module: createMap(createDictionaryOfIdsFromArray(data)),
        allModulesSearched: true,
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};

export const CreateModule = async (moduleData, { t, dispatch }, cb) => {
  try {
    const { data } = await SendData('POST', 'modules', moduleData);
    toast.success(t('Module.Created'));

    callFunctions(cb);

    dispatch({
      type: actionTypes.CREATE_MODULE,
      payload: {
        module: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};

export const GetAllSchedules = async ({ dispatch }) => {
  try {
    const { data } = await GetData('schedules');
    dispatch({
      type: actionTypes.GET_ALL_SCHEDULES,
      payload: {
        schedules: createMap(createDictionaryOfIdsFromArray(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};

export const UpdateModule = async (id, moduleData, { dispatch, t }, cb) => {
  try {
    const { data } = await SendData('PUT', `modules/${id}`, moduleData);
    toast.success(t('Module.Updated'));
    callFunctions(cb);
    dispatch({
      type: actionTypes.UPDATE_MODULE,
      payload: {
        module: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};

export const DeleteModule = async (id, { dispatch }, cb) => {
  try {
    const { data } = await SendData('DELETE', `modules/${id}`);
    toast.success(data.message);
    callFunctions(cb);

    dispatch({
      type: actionTypes.DELETE_MODULE,
      payload: {
        moduleId: id,
      },
    });
  } catch ({ response }) {
    console.error('TCL: DeleteModule -> response', response);
  }
};

export const GetModulesForPeriod = async (id, { dispatch }) => {
  try {
    const { data } = await GetData(`periods/${id}/modules`);
    dispatch({
      type: actionTypes.GET_MODULES_FOR_PERIOD,
      payload: {
        periodId: id,
        modules: createMap(createDictionaryOfIdsFromArray(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: DeleteModule -> response', response);
  }
};

export const GetStudentsForModule = async (id, { dispatch }) => {
  try {
    const { data } = await GetData(`/modules/${id}/students`);
    dispatch({
      type: actionTypes.GET_STUDENTS_FOR_MODULE,
      payload: {
        moduleId: id,
        students: createMap({
          [id]: [...data],
        }),
      },
    });
  } catch ({ response }) {
    console.error('TCL: DeleteModule -> response', response);
  }
};
