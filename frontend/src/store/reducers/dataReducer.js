import actionTypes from '../types';

import { createMap } from '../../lib/utils';

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
        users: new Map([...state.users, ...payload.user]),
      };
    case actionTypes.USER_NOT_FOUND:
      return {
        ...state,
        users: new Map([...state.users]),
        notFoundUsers: [...new Set([...state.notFoundUsers, payload.id])],
      };
    case actionTypes.GET_SENPAI_MODULES_SUCCESS:
      return {
        ...state,
        users: new Map([
          ...state.users,
          ...createMap({
            [payload.id]: {
              ...state.users.get(payload.id),
              ...payload.modules,
            },
          }),
        ]),
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
