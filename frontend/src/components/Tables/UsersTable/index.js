import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Table from '../../UI/Table';

import routes from '../../../lib/config/routes';
import { formatNationalId } from '../../../lib/utils';

const UsersTable = ({ users, ...props }) => {
  const { t } = useTranslation();

  const columns = [
    {
      key: 'nationalId',
      text: t('NationalId'),
      render: nationalId => formatNationalId(nationalId),
    },
    {
      key: 'name',
      text: t('Name'),
    },
    {
      key: 'email',
      text: t('Email'),
    },
    {
      key: 'details',
      text: '',
      render: (_, user) => (
        <Link to={routes.dashboard.user.profile(user.id)}>{t('SeeProfile')}</Link>
      ),
    },
  ];

  return <Table columns={columns} data={users} noData={t('User.NoUsers')} {...props} />;
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default UsersTable;
