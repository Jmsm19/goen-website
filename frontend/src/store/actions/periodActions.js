import { toast } from 'react-toastify';

import actionTypes from '../types';
import { GetData, SendData } from '../../lib/utils/http';
import {
  createDictionaryOfIdsFromArray,
  createMap,
  createDictionaryItem,
  callFunctions,
} from '../../lib/utils';

export const GetActivePeriod = dispatch => {
  GetData('periods/active')
    .then(({ data }) => {
      dispatch({
        type: actionTypes.GET_ACTIVE_PERIOD,
        payload: {
          activePeriod: data.id,
          periods: createMap(createDictionaryItem(data)),
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

export const GetPeriod = (id, { dispatch }) => {
  GetData(`periods/${id}`).then(({ data }) => {
    dispatch({
      type: actionTypes.GET_PERIOD,
      payload: {
        period: createMap(createDictionaryItem(data)),
      },
    });
  });
};

export const GetAllPeriods = ({ dispatch }) => {
  GetData('periods').then(({ data }) => {
    dispatch({
      type: actionTypes.GET_ALL_PERIODS,
      payload: {
        periods: createMap(createDictionaryOfIdsFromArray(data)),
        allPeriodsSearched: true,
      },
    });
  });
};

export const CreatePeriod = (periodData, { dispatch, t }, cb) => {
  SendData('POST', 'periods', periodData).then(({ data }) => {
    callFunctions([() => toast.success(t('Period.Created')), cb]);
    dispatch({
      type: actionTypes.CREATE_PERIOD,
      payload: {
        period: createMap(createDictionaryItem(data)),
      },
    });
  });
};

export const UpdatePeriod = (id, periodData, { dispatch, t }, cb) => {
  SendData('PUT', `periods/${id}`, periodData).then(({ data }) => {
    callFunctions([() => toast.success(t('Period.Updated')), cb]);
    dispatch({
      type: actionTypes.UPDATE_PERIOD,
      payload: {
        period: createMap(createDictionaryItem(data)),
      },
    });
  });
};

export const DeletePeriod = (id, { dispatch }) => {
  SendData('DELETE', `periods/${id}`).then(({ data }) => {
    toast.success(data.message);
    dispatch({
      type: actionTypes.DELETE_PERIOD,
      payload: {
        periodId: id,
      },
    });
  });
};
