import { GetData, SendData } from '../../lib/utils/http';
import {
  createDictionaryOfIdsFromArray,
  createMap,
  createDictionaryItem,
  callFunctions,
  generateSnackbarConfig,
} from '../../lib/utils';

export const GetActivePeriod: GetActivePeriod = async dispatch => {
  try {
    const { data } = await GetData('periods/active');
    dispatch({
      type: 'GET_ACTIVE_PERIOD',
      payload: {
        activePeriod: data.id,
        periods: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    if (response.status === 401) {
      dispatch({
        type: 'AUTH_LOGIN_FAILED',
        payload: { ...response },
      });
    }
  }
};

export const GetPeriod: GetPeriod = async (id, { dispatch }) => {
  try {
    const { data } = await GetData(`periods/${id}`);
    dispatch({
      type: 'GET_PERIOD',
      payload: {
        period: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: GetPeriod -> response', response);
  }
};

export const GetAllPeriods: GetAllPeriods = async ({ dispatch }) => {
  try {
    const { data } = await GetData('periods');
    dispatch({
      type: 'GET_ALL_PERIODS',
      payload: {
        periods: createMap(createDictionaryOfIdsFromArray(data)),
        allPeriodsSearched: true,
      },
    });
  } catch ({ response }) {
    console.error('TCL: GetPeriod -> response', response);
  }
};

export const CreatePeriod: CreatePeriod = async (periodData, { dispatch, t, enqueueSnackbar }, cb) => {
  try {
    const { data } = await SendData('POST', 'periods', periodData);
    callFunctions([
      () => enqueueSnackbar(t('Period.Created'), generateSnackbarConfig('success')),
      cb,
    ]);
    dispatch({
      type: 'CREATE_PERIOD',
      payload: {
        period: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: GetPeriod -> response', response);
  }
};

export const UpdatePeriod: UpdatePeriod = async (id, periodData, { dispatch, t, enqueueSnackbar }, cb) => {
  try {
    const { data } = await SendData('PUT', `periods/${id}`, periodData);
    callFunctions([
      () => enqueueSnackbar(),
      cb,
    ]);
    dispatch({
      type: 'UPDATE_PERIOD',
      payload: {
        period: createMap(createDictionaryItem(data)),
      },
    });
  } catch ({ response }) {
    console.error('TCL: GetPeriod -> response', response);
  }
};

export const DeletePeriod: DeletePeriod = async (id, { dispatch, enqueueSnackbar }) => {
  try {
    const { data } = await SendData('DELETE', `periods/${id}`);
    enqueueSnackbar(data.message, generateSnackbarConfig('success'));
    dispatch({
      type: 'DELETE_PERIOD',
      payload: {
        periodId: id,
      },
    });
  } catch ({ response }) {
    console.error('TCL: GetPeriod -> response', response);
  }
};
