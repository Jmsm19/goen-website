import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';

import DeleteButton from '../../Buttons/DeleteButton';
import Loading from '../../Loading';

import routes from '../../../lib/config/routes';
import useTableStyles from '../styles';

const PeriodsTable = ({ periods, deleteCol, onDelete, loading, ...props }) => {
  const { t } = useTranslation();
  const classes = useTableStyles();

  return (
    <Paper className={classes.tableWrapper}>
      {loading ? (
        <Loading />
      ) : (
        <Table className={classnames(['periods-table', classes.table, classes.periodsTable])}>
          <TableHead>
            <TableRow>
              <TableCell>{t('Period.Name')}</TableCell>
              <TableCell>{t('Period.Year')}</TableCell>
              <TableCell>{t('Period.IsActive')}</TableCell>
              {deleteCol && <TableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {periods.map(({ id, name, year, active }) => (
              <TableRow key={id}>
                <TableCell component='th' scope='row'>
                  <Link to={routes.dashboard.admin.periodDetails(id)}>
                    {`${t('Period._singular')} ${name}`}
                  </Link>
                </TableCell>
                <TableCell>{year}</TableCell>
                <TableCell className={active ? 'active-period' : 'closed-period'}>
                  {t(`Period.${active ? 'Active' : 'Over'}`)}
                </TableCell>
                {deleteCol && (
                  <TableCell>
                    <DeleteButton iconSize={15} onClick={() => onDelete(id)} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

PeriodsTable.defaultProps = {
  deleteCol: false,
  onDelete: () => null,
  loading: false,
};

PeriodsTable.propTypes = {
  periods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  deleteCol: PropTypes.bool,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
};

export default PeriodsTable;
