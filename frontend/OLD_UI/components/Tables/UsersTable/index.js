import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Table, TableHead, TableCell, TableBody, TableRow, Paper } from '@material-ui/core';

import Loading from '../../Loading';

import { formatNationalId } from '../../../lib/utils';
import routes from '../../../lib/config/routes';
import useTableStyles from '../styles';

const UsersTable = ({ users, loading, ...props }) => {
  const { t } = useTranslation();
  const classes = useTableStyles();

  return (
    <Paper className={classes.tableWrapper}>
      {loading ? (
        <Loading />
      ) : (
        <Table className={classnames(['users-table', classes.table])}>
          <TableHead>
            <TableRow>
              <TableCell>{t('Name')}</TableCell>
              <TableCell>{t('NationalId')}</TableCell>
              <TableCell>{t('Email')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, name, nationalId, email }) => (
              <TableRow key={id}>
                <TableCell component='th' scope='row'>
                  <Link to={routes.dashboard.user.profile(id)}>{name}</Link>
                </TableCell>
                <TableCell>{formatNationalId(nationalId)}</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

UsersTable.defaultProps = {
  loading: false,
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool,
};

export default UsersTable;
