const ModuleReducer: ModuleContextReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_MODULE':
      return {
        ...state,
        modules: new Map([...state.modules, ...payload.module]),
        allModulesSearched: state.allModulesSearched || !!payload.allModulesSearched,
      };
    case 'MODULE_NOT_FOUND':
      return {
        ...state,
        modules: new Map([...state.modules]),
        notFoundModules: [...new Set([...state.notFoundModules, payload.id])],
      };
    case 'CREATE_MODULE':
    case 'UPDATE_MODULE':
      return {
        ...state,
        modules: new Map([...state.modules, ...payload.module]),
      };
    case 'DELETE_MODULE':
      state.modules.delete(payload.moduleId);
      return {
        ...state,
        modules: new Map([...state.modules]),
      };
    case 'GET_ALL_SCHEDULES':
      return {
        ...state,
        schedules: new Map([...state.schedules, ...payload.schedules]),
      };
    case 'GET_MODULES_FOR_PERIOD':
      return {
        ...state,
        searchedPeriods: [...state.searchedPeriods, payload.periodId],
        modules: new Map([...state.modules, ...payload.modules]),
      };
    case 'GET_STUDENTS_FOR_MODULE':
      return {
        ...state,
        students: new Map([...state.students, ...payload.students]),
      };
    // Default responses
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default ModuleReducer;
