import actionTypes from '../types';
import { createMap } from '../../lib/utils';

const PeriodReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        users: new Map([...state.users, ...payload.user]),
        allUsersSearched: state.allUsersSearched || !!payload.allUsersSearched,
      };
    case actionTypes.USER_NOT_FOUND:
      return {
        ...state,
        users: new Map([...state.users]),
        notFoundUsers: [...new Set([...state.notFoundUsers, payload.id])],
      };
    case actionTypes.GET_SENPAI_MODULES:
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
    // Default responses
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export default PeriodReducer;
