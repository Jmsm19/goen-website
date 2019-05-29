import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUsers } from '../../../../store/context/UsersContext';
import useDebounce from '../../../../hooks/useDebounce';

import Input from '../../../../components/UI/Input';
import FloatButton from '../../../../components/UI/FloatButton';
import UsersTable from '../../../../components/Tables/UsersTable';

import { filterArrayBy } from '../../../../lib/utils';
import StyledPage from './styles';

const UsersListPage = props => {
  const { t } = useTranslation();
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  const { allUsersSearched, users, getAllUsers } = useUsers();
  const [valueToFilter, setValueToFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(null);
  const usersArray = useMemo(() => [...users.values()], [users]);
  const debounceValueToFilter = useDebounce(valueToFilter);

  useEffect(() => {
    if (!isSearchingUsers && !allUsersSearched) {
      setIsSearchingUsers(true);
      getAllUsers();
    } else if (isSearchingUsers && allUsersSearched) {
      setIsSearchingUsers(false);
    }
  }, [allUsersSearched, getAllUsers, isSearchingUsers]);

  useEffect(() => {
    setFilteredUsers(filterArrayBy('nationalId', debounceValueToFilter, usersArray));
  }, [debounceValueToFilter, users, usersArray]);

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
          <FloatButton
            theme='primary'
            onClick={() => setValueToFilter('')}
            disabled={!valueToFilter}
          >
            {t('Filter.Clear')}
          </FloatButton>
        </div>

        <UsersTable users={filteredUsers || usersArray} loading={!allUsersSearched} />
      </section>
    </StyledPage>
  );
};

UsersListPage.propTypes = {};

export default UsersListPage;
