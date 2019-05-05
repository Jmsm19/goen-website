import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
// import { Link } from 'react-router-dom';

import Card from '../../../../../components/UI/Card';

// import routes from '../../../../../lib/config/routes';
import { formatHoursFromDB } from '../../../../../lib/utils';

const ModulesAvailable = ({ t, modules, selectModule }) => (
  <>
    <h2 className='section-title'>{t('Module._plural')}</h2>
    <section className='modules-section'>
      {modules.map(module => {
        const { schedule } = module;
        return (
          <Card
            key={uuid()}
            title={module.fullName}
            hoverable
            fullWidth
            onClick={() => selectModule(module)}
          >
            <p>{t(schedule.day)}</p>
            <p>
              {formatHoursFromDB(schedule.from)} - {formatHoursFromDB(schedule.until)}
            </p>
          </Card>
        );
      })}
    </section>
  </>
);

ModulesAvailable.defaultProps = {
  modules: [],
};

ModulesAvailable.propTypes = {
  t: PropTypes.func.isRequired,
  selectModule: PropTypes.func.isRequired,
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      schedule: PropTypes.shape({
        day: PropTypes.string,
        from: PropTypes.string,
        until: PropTypes.string,
      }),
    }),
  ),
};

export default ModulesAvailable;
