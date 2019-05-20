import actionTypes from '../types';

const ModuleReducer = (state, action) => {
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
    case actionTypes.CREATE_MODULE:
    case actionTypes.UPDATE_MODULE:
      return {
        ...state,
        modules: new Map([...state.modules, ...payload.module]),
      };
    case actionTypes.DELETE_MODULE:
      state.modules.delete(payload.moduleId);
      return {
        ...state,
        modules: new Map([...state.modules]),
      };
    case actionTypes.GET_ALL_SCHEDULES:
      return {
        ...state,
        schedules: new Map([...state.schedules, ...payload.schedules]),
      };
    case actionTypes.GET_MODULES_FOR_PERIOD:
      return {
        ...state,
        searchedPeriods: [...state.searchedPeriods, payload.periodId],
        modules: new Map([...state.modules, ...payload.modules]),
      };
    case actionTypes.GET_STUDENTS_FOR_MODULE:
      return {
        ...state,
        students: new Map([...state.students, ...payload.students]),
      };
    // Default responses
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export default ModuleReducer;
