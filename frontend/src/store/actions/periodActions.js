import actionTypes from '../types';
import { GetData } from '../../lib/utils/http';
import { createDictionaryOfIdsFromArray, createMap } from '../../lib/utils';
import {
  getTotalStudents,
  getTotalRegisteredStudents,
  getActualIncome,
  getExpectedIncome,
} from './fns';

// eslint-disable-next-line import/prefer-default-export
export const GetActivePeriod = dispatch => {
  GetData('periods/active')
    .then(({ data }) => {
      const modules = createMap(createDictionaryOfIdsFromArray(data.modules));

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
