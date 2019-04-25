import React from 'react';
import PropTypes from 'prop-types';
import { isWithinRange } from 'date-fns';

import Card from '../../../../../components/UI/Card';

import { formatPrice } from '../../../../../lib/utils';

const PeriodSummary = ({ t, period }) => {
  const getTotalRegisteredStudents = modules =>
    modules.reduce((total, module) => total + module.students.length, 0);

  const calculateOptimalModuleIncome = module => module.price.amount * 14;

  const calculateActualModuleIncome = module => module.price.amount * module.students.length;

  const getOptimalIncome = modules =>
    modules.reduce((total, module) => total + calculateOptimalModuleIncome(module), 0);

  const getActualIncome = modules =>
    modules.reduce((total, module) => total + calculateActualModuleIncome(module), 0);

  return (
    <section className='summary-section'>
      <Card title={t('ModuleRegister')} fullWidth>
        {isWithinRange(new Date(), period.signupFrom, period.signupUntil) ? (
          <div>
            <div>
              <p>{t('ActiveModules')}:</p>
              <p>{period.modules.length}</p>
            </div>
            <div>
              <p>{t('RegisteredStudents')}:</p>
              <p>
                {getTotalRegisteredStudents(period.modules)} / {period.modules.length * 14}
              </p>
            </div>
          </div>
        ) : (
          <h3>{t('RegistrationsClosed')}</h3>
        )}
      </Card>

      <Card title={t('Income')} fullWidth>
        <div>
          <div>
            <p>{t('CurrentIncome')}:</p>
            <p>{formatPrice(getActualIncome(period.modules))}</p>
          </div>
          <div>
            <p>{t('OptimalIncome')}:</p>
            <p>{formatPrice(getOptimalIncome(period.modules) * 1000)}</p>
          </div>
        </div>
      </Card>
    </section>
  );
};

PeriodSummary.propTypes = {
  t: PropTypes.func.isRequired,
  period: PropTypes.shape({
    signupFrom: PropTypes.string,
    signupUntil: PropTypes.string,
    modules: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default PeriodSummary;
