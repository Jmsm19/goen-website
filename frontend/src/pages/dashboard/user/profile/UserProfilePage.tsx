import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../../store/context/AuthContext';
import { useUsers } from '../../../../store/context/UsersContext';

import Loading from '../../../../components/Loading';
import SectionSelector from './sections';
import UserInfoSection from './sections/UserInfoSection';

import { StyledPage } from './styles';

interface Props {
  match: {
    params: {
      id?: string;
    };
  };
}

const UserProfilePage: React.FC<Props> = ({ match: { params } }) => {
  const { id } = params;
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const [isSearchingUser, setIsSearchingUser] = useState(false);
  const { users, notFoundUsers, getUser } = useUsers();
  const user = id ? users.get(id) : authUser;

  useEffect(() => {
    if (id) {
      if (!isSearchingUser && !users.has(id) && !notFoundUsers.includes(id)) {
        setIsSearchingUser(true);
        getUser(id);
      } else if (isSearchingUser && (users.has(id) || notFoundUsers.includes(id))) {
        setIsSearchingUser(false);
      }
    }
  }, [getUser, id, isSearchingUser, notFoundUsers, users]);

  if (!user) {
    if (id && notFoundUsers.includes(id)) {
      return <h1>{t('User.NotFound')}</h1>;
    }

    return <Loading text={t('User.Searching')} />;
  }

  return (
    <StyledPage className='user-profile'>
      <UserInfoSection user={user} />

      <SectionSelector user={user} />
    </StyledPage>
  );
};

UserProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default UserProfilePage;
