import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getObjectByIdFromArray } from '../../../lib/utils';
import routes from '../../../lib/config/routes';
import StyledTable from './styles';

const StudentsTable = ({ t, students, withGradeForModule }) => {
  const columns = [
    {
      key: 'name',
      text: t('Name'),
    },
    {
      key: 'email',
      text: t('Email'),
    },
    {
      key: 'registrationStatus',
      text: t('Status'),
      render: status => <span className={status}>{t(`Student.Status.${status}`)}</span>,
    },
  ];

  if (withGradeForModule) {
    columns.push({
      key: 'grades',
      text: t('Grade._singular'),
      render: grades =>
        getObjectByIdFromArray(grades, withGradeForModule) || t('Student.NotGraded'),
    });
  }

  columns.push({
    key: 'details',
    text: '',
    render: (_, student) => (
      <Link to={routes.dashboard.student.profile(student.id)}>{t('SeeProfile')}</Link>
    ),
  });

  return <StyledTable columns={columns} data={students} noData={t('Student.NoStudents')} />;
};

StudentsTable.defaultProps = {
  withGradeForModule: null,
};

StudentsTable.propTypes = {
  t: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape).isRequired,
  withGradeForModule: PropTypes.string,
};

export default StudentsTable;
