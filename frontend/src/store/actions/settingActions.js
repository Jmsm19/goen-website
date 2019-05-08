import actionTypes from '../types';
import { GetData, SendData } from '../../lib/utils/http';
import { snakeCaseToCamelCase } from '../../lib/utils';

export const GetSettings = dispatch => {
  GetData('settings').then(({ data }) => {
    dispatch({
      type: actionTypes.GET_SETTINGS,
      payload: {
        settings: { ...data },
      },
    });
  });
};

export const UpdateSettings = (settingName, value, dispatch) => {
  const settingToUpdate = { settingName, value };
  SendData('PUT', 'settings', settingToUpdate).then(({ data }) => {
    dispatch({
      type: actionTypes.UPDATE_SETTINGS,
      payload: {
        settings: {
          [snakeCaseToCamelCase(settingName)]: value,
        },
      },
    });
  });
};
