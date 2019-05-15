import actionTypes from '../types';

const PeriodReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_MODULE:
      return {
        ...state,
        modules: new Map([...state.modules, ...payload.module]),
        allModulesSearched: state.allModulesSearched || !!payload.allModulesSearched,
      };
    case actionTypes.MODULE_NOT_FOUND:
      return {
        ...state,
        modules: new Map([...state.modules]),
        notFoundModules: [...new Set([...state.notFoundModules, payload.id])],
      };
    // Default responses
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export default PeriodReducer;
