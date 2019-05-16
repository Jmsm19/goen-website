import React from 'react';
import { createMap } from '../lib/utils';

import UserReducer from '../store/reducers/userReducer';
import * as UA from '../store/actions/userActions';

const UsersContext = React.createContext();

// CONTEXT PROVIDER
const UsersProvider = props => {
  const initialState = {
    allUsersSearched: false,
    users: createMap(),
    notFoundUsers: [],
  };

  const [state, dispatch] = React.useReducer(UserReducer, initialState);
  const { allUsersSearched, users, notFoundUsers } = state;

  const value = React.useMemo(
    () => ({
      allUsersSearched,
      users,
      notFoundUsers,
      dispatch,
    }),
    [allUsersSearched, users, notFoundUsers],
  );

  return <UsersContext.Provider value={value} {...props} />;
};

// USERS HOOK
const useUsers = () => {
  const context = React.useContext(UsersContext);

  if (!context) {
    throw new Error('useUsers must be used within UsersProvider');
  }

  const { dispatch, ...contextRest } = context;

  const actions = {
    getUser: id => UA.GetUser(id, dispatch),
    getAllUsers: () => UA.GetAllUsers(dispatch),
  };

  return {
    ...contextRest,
    ...actions,
  };
};

// INSTRUCTORS HOOK
const useInstructors = () => {
  const context = React.useContext(UsersContext);

  if (!context) {
    throw new Error('useInstructors must be used within UsersProvider');
  }

  const { dispatch, users, ...contextRest } = context;

  const { instructors, assistants } = React.useMemo(() => {
    const instructorsMap = createMap();
    const assistantsMap = createMap();

    if (users.size) {
      users.forEach(user => {
        if (user.isInstructor) {
          instructorsMap.set(user.id, user);
        }
        if (user.isAssistant) {
          assistantsMap.set(user.id, user);
        }
      });
    }

    return {
      instructors: instructorsMap,
      assistants: assistantsMap,
    };
  }, [users]);

  const actions = {
    getAllUsers: () => UA.GetAllUsers(dispatch),
    getSenpaiModules: (role, id) => UA.GetSenpaiModules(role, id, dispatch),
  };

  return {
    instructors,
    assistants,
    ...contextRest,
    ...actions,
  };
};

export { UsersProvider, useUsers, useInstructors };
