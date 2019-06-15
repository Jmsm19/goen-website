import { createMap } from '../../lib/utils';

const UserReducer: UserContextReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_USER':
      return {
        ...state,
        users: new Map([...state.users, ...payload.user]),
        allUsersSearched: state.allUsersSearched || !!payload.allUsersSearched,
      };
    case 'USER_NOT_FOUND':
      return {
        ...state,
        users: new Map([...state.users]),
        notFoundUsers: [...new Set([...state.notFoundUsers, payload.id])],
      };
    case 'GET_SENPAI_MODULES':
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
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default UserReducer;
