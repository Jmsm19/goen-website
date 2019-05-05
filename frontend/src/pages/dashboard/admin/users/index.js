import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import UsersTable from '../../../../components/Tables/UsersTable';
import { DataContext } from '../../../../context/DataContext';

import StyledPage from './styles';

const UsersListPage = props => {
  const { t } = useTranslation();
  const { allUsersSearched, users, getAllUsers } = useContext(DataContext);

  useEffect(() => {
    if (!allUsersSearched) {
      getAllUsers();
    }
  }, []);

  return (
    <StyledPage className='users-lists-page'>
      <h1>{t('User._plural')}</h1>

      <section>
        <UsersTable users={[...users.values()]} loading={!allUsersSearched} />
      </section>
    </StyledPage>
  );
};

UsersListPage.propTypes = {};

export default UsersListPage;
