import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Input from '../../../../components/UI/Input';
import Button from '../../../../components/UI/Button';
import UsersTable from '../../../../components/Tables/UsersTable';
import { DataContext } from '../../../../context/DataContext';

import StyledPage from './styles';
import { filterArrayBy } from '../../../../lib/utils';

const UsersListPage = props => {
  const { t } = useTranslation();
  const { allUsersSearched, users, getAllUsers } = useContext(DataContext);
  const [valueToFilter, setValueToFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(null);

  useEffect(() => {
    if (!allUsersSearched) {
      getAllUsers();
    }
  }, [allUsersSearched, getAllUsers]);

  useEffect(() => {
    const usersArray = [...users.values()];
    setFilteredUsers(filterArrayBy('nationalId', valueToFilter, usersArray));
  }, [users, valueToFilter]);

  return (
    <StyledPage className='users-lists-page'>
      <h1>{t('User._plural')}</h1>

      <section className='users-section'>
        <div className='users-search-area'>
          <Input
            type='text'
            name='nationalId'
            inputMode='numeric'
            value={valueToFilter}
            placeholder={t('Search.ByNationalId')}
            onChange={({ target: { value } }) => setValueToFilter(value)}
          />
          <Button
            outline
            type='primary'
            text={t('Filter.Clear')}
            onClick={() => setValueToFilter('')}
            disabled={!valueToFilter}
          />
        </div>

        <UsersTable users={filteredUsers || []} loading={!allUsersSearched} />
      </section>
    </StyledPage>
  );
};

UsersListPage.propTypes = {};

export default UsersListPage;
