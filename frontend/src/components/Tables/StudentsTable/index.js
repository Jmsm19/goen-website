import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';

import Loading from '../../Loading';

import routes from '../../../lib/config/routes';

import { getObjectByIdFromArray } from '../../../lib/utils';
import useTableStyles from '../styles';

const StudentsTable = ({ students, withGrade, moduleId, loading, ...props }) => {
  const { t } = useTranslation();
  const classes = useTableStyles();

  return (
    <Paper className={classes.tableWrapper}>
      {loading ? (
        <Loading />
      ) : (
        <Table className={classnames(['students-table', classes.table])}>
          <TableHead>
            <TableRow>
              <TableCell>{t('Name')}</TableCell>
              <TableCell>{t('Email')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
              {withGrade && <TableCell>{t('Grade._singular')}</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(({ id, name, email, registrationStatus, grades, ...lo }) => (
              <TableRow key={id}>
                <TableCell component='th' scope='row'>
                  <Link to={routes.dashboard.user.profile(id)}>{name}</Link>
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell className={classnames([registrationStatus, classes.registrationStatus])}>
                  {t(`Student.Status.${registrationStatus}`)}
                </TableCell>
                {withGrade && (
                  <TableCell>
                    {getObjectByIdFromArray(grades, moduleId) || t('Student.NotGraded')}
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

StudentsTable.defaultProps = {
  withGrade: false,
  loading: false,
};

StudentsTable.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape).isRequired,
  withGrade: PropTypes.bool,
  moduleId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default StudentsTable;
