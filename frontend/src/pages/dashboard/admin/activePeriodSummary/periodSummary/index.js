import React from 'react';
import PropTypes from 'prop-types';
import { isWithinRange } from 'date-fns';

import Card from '../../../../../components/UI/Card';

import { formatPrice } from '../../../../../lib/utils';

const PeriodSummary = ({ t, period, periodSummary }) => {
  const { totalRegisteredStudents, totalStudents, actualIncome, expectedIncome } = periodSummary;

  return (
    <section className='summary-section'>
      <Card title={t('ModuleRegister')} fullWidth>
        {isWithinRange(new Date(), period.signupFrom, period.signupUntil) ? (
          <div>
            <div>
              <p>{t('Period.AvailableModules')}:</p>
              <p>{period.modules.length}</p>
            </div>
            <div>
              <p>{t('Student.ConfirmedStudents')}:</p>
              <p>
                {totalRegisteredStudents} / {totalStudents}
              </p>
            </div>
          </div>
        ) : (
          <h3>{t('Period.RegistrationsClosed')}</h3>
        )}
      </Card>

      <Card title={t('Period.Income')} fullWidth>
        <div>
          <div>
            <p>{t('Period.CurrentIncome')}:</p>
            <p>{formatPrice(actualIncome)}</p>
          </div>
          <div>
            <p>{t('Period.ExpectedIncome')}:</p>
            <p>{formatPrice(expectedIncome)}</p>
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
  periodSummary: PropTypes.shape({
    totalRegisteredStudents: PropTypes.number,
    totalStudents: PropTypes.number,
    actualIncome: PropTypes.number,
    expectedIncome: PropTypes.number,
  }).isRequired,
};

export default PeriodSummary;
