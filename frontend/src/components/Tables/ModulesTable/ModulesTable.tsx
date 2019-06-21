import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';

import Loading from '../../Loading';

import { ModulePropType } from '../../../lib/validation/propTypesValues';
import { getClanImageAddress, formatHoursFromDB } from '../../../lib/utils';
import useTableStyles from '../styles';

interface Props {
  modules: Module[];
  loading?: boolean;
}

const ModulesTable: React.FC<Props> = ({ modules, loading }) => {
  const { t } = useTranslation();
  const classes = useTableStyles();

  return (
    <Paper className={classes.tableWrapper}>
      {loading ? (
        <Loading />
      ) : (
        <Table className={classnames(['modules-table', classes.table, classes.modulesTable])}>
          <TableHead>
            <TableRow>
              <TableCell>{t('Module.Clan')}</TableCell>
              <TableCell>{t('Module._singular')}</TableCell>
              <TableCell>{t('Period._singular')}</TableCell>
              <TableCell>{t('Schedule._singular')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modules.map(({ id, clan, period, schedule, fullName }) => (
              <TableRow key={id}>
                <TableCell component='th' scope='row'>
                  {clan ? (
                    <img src={getClanImageAddress(clan.name)} alt={clan.name} width={50} />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>{fullName}</TableCell>
                <TableCell>{period ? `${period.name} - ${period.year}` : '-'}</TableCell>
                <TableCell>{`${t(schedule.day)} - ${formatHoursFromDB(schedule.from)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

ModulesTable.defaultProps = {
  loading: false,
};

ModulesTable.propTypes = {
  modules: PropTypes.arrayOf(ModulePropType.isRequired).isRequired,
  loading: PropTypes.bool,
};

export default ModulesTable;
