import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { List } from 'antd';
import { formatHoursFromDB } from '../../../utils';

const ModulesList = ({ t, modules, loading }) => (
  <List
    loading={loading}
    style={{ minHeight: 100, maxHeight: 500, height: '100%' }}
    dataSource={modules}
    locale={{
      emptyText: t('NoModules'),
    }}
    renderItem={({ id, name, section, period, schedule, instructor }) => {
      const title = `${name} ${section}`;
      return (
        <List.Item>
          <List.Item.Meta
            title={
              <Link href={`/dashboard/admin/modules/details?id=${id}`}>
                <a>{title}</a>
              </Link>
            }
            description={
              <div>
                <p style={{ margin: 0 }}>
                  <b>{t('Instructor')}: </b>
                  {instructor ? instructor.name : t('NoInstructorAssigned')}{' '}
                </p>
                <p style={{ margin: 0 }}>
                  <b>{t('Module.Schedule')}: </b>
                  {t(schedule.day)} ({formatHoursFromDB(schedule.from)} -{' '}
                  {formatHoursFromDB(schedule.until)})
                </p>
              </div>
            }
          />
          <p>{`${period.name}-${period.year}`}</p>
        </List.Item>
      );
    }}
  />
);

ModulesList.defaultProps = {
  loading: false,
};

ModulesList.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default ModulesList;
