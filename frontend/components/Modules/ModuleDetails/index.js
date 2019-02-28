import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import Loading from '../../SiteGeneral/Loading';
import { formatHoursFromDB } from '../../../utils';
import StudentList from '../../Lists/StudentList';
import DualColumnCard from '../../Cards/DualColumnCard';

function ModuleDetails({ t, module, students, loadingStudents }) {
  if (!module) {
    return <Loading />;
  }

  if (module === 'Not found') {
    return (
      <div>
        <h1>{t('NoModule')}</h1>
      </div>
    );
  }
  const { schedule, instructor } = module;

  return (
    <div style={{ display: 'grid', gridGap: 10 }}>
      <DualColumnCard
        /* Clan image, if any */
        firstColumn={
          module.clan && (
            <img src={`/static/images/clans/${module.clan.toLowerCase()}.png`} alt={module.clan} />
          )
        }
        /* Module meta */
        secondColumn={
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ marginRight: 10 }}>
              <h1>
                {module.name} {module.section}
              </h1>
              {/* Schedule */}
              <h3>
                {t(schedule.day)} {formatHoursFromDB(schedule.from)} -{' '}
                {formatHoursFromDB(schedule.until)}
              </h3>
            </div>
            {instructor && (
              <div>
                <h2>{t('Instructor')}</h2>
                <h3>{instructor.name}</h3>
              </div>
            )}
          </div>
        }
      />

      {/* Student list */}
      <Card title={t('Students')}>
        <StudentList t={t} students={students} loading={loadingStudents} />
      </Card>
    </div>
  );
}

ModuleDetails.defaultProps = {
  module: undefined,
  students: [],
  loadingStudents: false,
};

ModuleDetails.propTypes = {
  t: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape()),
  loadingStudents: PropTypes.bool,
  module: PropTypes.shape({
    name: PropTypes.string,
    section: PropTypes.string,
  }),
};

export default ModuleDetails;
