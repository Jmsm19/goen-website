const SettingStateReducer: SettingContextReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_SETTINGS':
      return {
        ...state,
        ...payload.settings,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        ...payload.settings,
      };
    // Default responses
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default SettingStateReducer;
