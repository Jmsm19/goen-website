import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../../UI/Card';

import { getTotalStudents, getTotalRegisteredStudents, getActualIncome } from '../fns';
import { formatPrice } from '../../../../lib/utils';

const SummarySection = ({ t, period, className, ...props }) => {
  const sectionClassNames = classnames(['summary-section', className]);

  const income = useMemo(() => {
    const total = getActualIncome(period.modules);
    return formatPrice(total);
  }, [period.modules]);

  const totalStudents = useMemo(() => getTotalStudents(period.modules), [period.modules]);

  const totalRegisteredStudents = useMemo(() => getTotalRegisteredStudents(period.modules), [
    period.modules,
  ]);

  return (
    <section className={sectionClassNames} {...props}>
      <Card title={t('ModuleRegister')} fullWidth>
        <div>
          <div>
            <p>{t('Student.ConfirmedStudents')}:</p>
            <p>
              {totalRegisteredStudents} / {totalStudents}
            </p>
          </div>
        </div>
      </Card>

      <Card title={t('Period.Income')} fullWidth>
        <div>
          <div>
            <p>{t('Period.CurrentIncome')}:</p>
            <p>{income}</p>
          </div>
        </div>
      </Card>
    </section>
  );
};

SummarySection.defaultProps = {
  className: null,
};

SummarySection.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
  period: PropTypes.shape({
    signupFrom: PropTypes.string,
    signupUntil: PropTypes.string,
    modules: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default SummarySection;
