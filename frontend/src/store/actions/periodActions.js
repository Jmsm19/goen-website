import actionTypes from '../types';
import { GetData } from '../../lib/utils/http';
import { createDictionaryOfIdsFromArray } from '../../lib/utils';
import {
  getTotalStudents,
  getTotalRegisteredStudents,
  getActualIncome,
  getExpectedIncome,
} from './fns';

export const GetActivePeriod = dispatch => {
  GetData('periods/active')
    .then(({ data }) => {
      const modules = createDictionaryOfIdsFromArray(data.modules);

      dispatch({
        type: actionTypes.GET_ACTIVE_PERIOD,
        payload: {
          activePeriod: { ...data },
          activePeriodSummary: {
            totalStudents: getTotalStudents(data.modules),
            totalRegisteredStudents: getTotalRegisteredStudents(data.modules),
            actualIncome: getActualIncome(data.modules),
            expectedIncome: getExpectedIncome(data.modules),
          },
          modules,
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

export const GetModule = (id, dispatch) => {
  GetData(`modules/${id}`)
    .then(({ data }) => {
      dispatch({
        type: actionTypes.GET_MODULE,
        payload: {
          module: { ...data },
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
