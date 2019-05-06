import actionTypes from '../types';

const SettingStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_SETTINGS:
      return {
        ...state,
        settings: {
          ...payload.settings,
        },
      };
    case actionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        modules: {
          ...state.settings,
          ...payload.settings,
        },
      };
    // Default responses
    default:
      return { ...state, ...payload };
  }
};

export default SettingStateReducer;
