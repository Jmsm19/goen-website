import actionTypes from '../types';

const DataStateReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_MODULE:
      return {
        ...state,
        modules: new Map([...state.modules, ...payload.module]),
        allModulesSearched: !!payload.allModulesSearched,
      };
    case actionTypes.MODULE_NOT_FOUND:
      return {
        ...state,
        modules: new Map([...state.modules]),
        notFoundModules: [...new Set([...state.notFoundModules, payload.id])],
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        users: {
          ...state.users,
          [payload.user.id]: payload.user,
        },
      };
    case actionTypes.USER_NOT_FOUND:
      return {
        ...state,
        users: {
          ...state.users,
          notFound: [
            ...new Set([
              ...(state.users && state.users.notFound ? state.users.notFound : []),
              payload.id,
            ]),
          ],
        },
      };
    case actionTypes.GET_SENPAI_MODULES_SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [payload.id]: {
            ...state.users[payload.id],
            ...payload.modules,
          },
        },
      };
    case actionTypes.GET_ACTIVE_PERIOD:
      return {
        ...state,
        ...payload,
        modules: new Map([...state.modules, ...payload.modules]),
      };
    // Default responses
    default:
      return { ...state, ...payload };
  }
};

export default DataStateReducer;
