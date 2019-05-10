import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Input from '../../../../components/UI/Input';
import Button from '../../../../components/UI/Button';
import UsersTable from '../../../../components/Tables/UsersTable';
import { DataContext } from '../../../../context/DataContext';

import StyledPage from './styles';
import { filterArrayBy } from '../../../../lib/utils';

const UsersListPage = props => {
  const { t } = useTranslation();
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  const { allUsersSearched, users, getAllUsers } = useContext(DataContext);
  const [valueToFilter, setValueToFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(null);
  const usersArray = useMemo(() => [...users.values()], [users]);

  useEffect(() => {
    if (!isSearchingUsers && !allUsersSearched) {
      setIsSearchingUsers(true);
      getAllUsers();
    } else if (isSearchingUsers && allUsersSearched) {
      setIsSearchingUsers(false);
    }
  }, [allUsersSearched, getAllUsers, isSearchingUsers]);

  useEffect(() => {
    setFilteredUsers(filterArrayBy('nationalId', valueToFilter, usersArray));
  }, [users, usersArray, valueToFilter]);

  return (
    <StyledPage className='users-lists-page'>
      <h1>{t('User._plural')}</h1>

      <section className='users-section'>
        <div className='users-search-area'>
          <Input
            flat
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

        <UsersTable users={filteredUsers || usersArray} loading={!allUsersSearched} />
      </section>
    </StyledPage>
  );
};

UsersListPage.propTypes = {};

export default UsersListPage;
