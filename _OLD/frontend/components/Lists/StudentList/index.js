import React from 'react';
import PropTypes from 'prop-types';
import { List, Tag } from 'antd';
import { getClanImageAddress } from '../../../utils';

const StudentList = ({ t, students, loading }) => (
  <List
    loading={loading}
    dataSource={students}
    locale={{
      emptyText: t('NoStudents'),
    }}
    renderItem={student => (
      <List.Item>
        <List.Item.Meta
          avatar={getClanImageAddress(student.clan)}
          title={student.name}
          description={student.email}
        />
        {student.registrationStatus === 'paying' && (
          <Tag color='red'>{t(student.registrationStatus)}</Tag>
        )}
      </List.Item>
    )}
  />
);

StudentList.defaultProps = {
  loading: false,
};

StudentList.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default StudentList;
