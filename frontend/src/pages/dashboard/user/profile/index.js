import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Loading from '../../../../components/Loading';
import { AuthContext } from '../../../../context/AuthContext';
import { DataContext } from '../../../../context/DataContext';

import { StyledPage } from './styles';
import SectionSelector from './sections';
import UserInfoSection from './sections/UserInfoSection';

const UserProfilePage = ({ match: { params } }) => {
  const { id } = params;
  const { authUser } = useContext(AuthContext);
  const { users, getUser } = useContext(DataContext);
  const { t } = useTranslation();
  const user = id ? users[id] : authUser;

  useEffect(() => {
    if (id) {
      if (!users[id] && !users.notFound.includes(id)) {
        getUser(id);
      }
    }
  }, []);

  if (!user) {
    if (users.notFound.includes(id)) {
      return <h1>{t('User.NotFound')}</h1>;
    }

    return <Loading text={t('User.Searching')} />;
  }

  return (
    <StyledPage className='user-profile'>
      <UserInfoSection t={t} user={user} />

      <SectionSelector t={t} user={user} />
    </StyledPage>
  );
};

UserProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default UserProfilePage;
