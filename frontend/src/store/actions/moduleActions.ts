import { GetData, SendData } from '../../lib/utils/http';
import {
  createDictionaryOfIdsFromArray,
  createMap,
  createDictionaryItem,
  callFunctions,
  generateSnackbarConfig,
} from '../../lib/utils';

export const GetModule: GetModule = async (id, dispatch) => {
  try {
    const { data } = await GetData(`modules/${id}`);
    dispatch({
      type: 'GET_MODULE',
      payload: {
        module: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    if (response.status === 404) {
      dispatch({
        type: 'MODULE_NOT_FOUND',
        payload: { ...response, id },
      });
    }
  }
};

export const GetAllModules: GetAllModules = async dispatch => {
  try {
    const { data } = await GetData('modules');
    dispatch({
      type: 'GET_MODULE',
      payload: {
        module: createMap(createDictionaryOfIdsFromArray(data)),
        allModulesSearched: true,
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};

export const CreateModule: CreateModule = async (
  moduleData,
  { t, dispatch, enqueueSnackbar },
  cb,
) => {
  try {
    const { data } = await SendData('POST', 'modules', moduleData);
    enqueueSnackbar(t('Module.Created'), generateSnackbarConfig('success'));

    callFunctions(cb);

    dispatch({
      type: 'CREATE_MODULE',
      payload: {
        module: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};

export const GetAllSchedules: GetAllSchedules = async ({ dispatch }) => {
  try {
    const { data } = await GetData('schedules');
    dispatch({
      type: 'GET_ALL_SCHEDULES',
      payload: {
        schedules: createMap(createDictionaryOfIdsFromArray(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};

export const UpdateModule: UpdateModule = async (
  id,
  moduleData,
  { dispatch, t, enqueueSnackbar },
  cb,
) => {
  try {
    const { data } = await SendData('PUT', `modules/${id}`, moduleData);
    enqueueSnackbar(t('Module.Updated'), generateSnackbarConfig('success'));
    callFunctions(cb);
    dispatch({
      type: 'UPDATE_MODULE',
      payload: {
        module: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: response', response);
  }
};

export const DeleteModule: DeleteModule = async (id, { dispatch, enqueueSnackbar }, cb) => {
  try {
    const { data } = await SendData('DELETE', `modules/${id}`);
    enqueueSnackbar(data.message, generateSnackbarConfig('success'));
    callFunctions(cb);

    dispatch({
      type: 'DELETE_MODULE',
      payload: {
        moduleId: id,
      },
    });
  } catch ({ response }) {
    console.error('TCL: DeleteModule -> response', response);
  }
};

export const GetModulesForPeriod: GetModulesForPeriod = async (id, { dispatch }) => {
  try {
    const { data } = await GetData(`periods/${id}/modules`);
    dispatch({
      type: 'GET_MODULES_FOR_PERIOD',
      payload: {
        periodId: id,
        modules: createMap(createDictionaryOfIdsFromArray(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: DeleteModule -> response', response);
  }
};

export const GetStudentsForModule: GetStudentsForModule = async (id, { dispatch }) => {
  try {
    const { data } = await GetData(`/modules/${id}/students`);
    dispatch({
      type: 'GET_STUDENTS_FOR_MODULE',
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
