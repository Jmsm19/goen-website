import { useContext } from 'react';

import { DataContext } from '../../context/DataContext';

const useUserDataContext = () => {
  const { allUsersSearched, users, notFoundUsers, getAllUsers, getUser } = useContext(DataContext);

  return {
    allUsersSearched,
    users,
    notFoundUsers,
    getAllUsers,
    getUser,
  };
};

export default useUserDataContext;
