import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getObjectByIdFromArray } from '../../../lib/utils';
import routes from '../../../lib/config/routes';
import StyledTable from './styles';

const StudentsTable = ({ students, withGradeForModule, ...props }) => {
  const { t } = useTranslation();

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
      <Link to={routes.dashboard.user.profile(student.id)}>{t('SeeProfile')}</Link>
    ),
  });

  return (
    <StyledTable columns={columns} data={students} noData={t('Student.NoStudents')} {...props} />
  );
};

StudentsTable.defaultProps = {
  withGradeForModule: null,
};

StudentsTable.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape).isRequired,
  withGradeForModule: PropTypes.string,
};

export default StudentsTable;
