import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isWithinRange } from 'date-fns';
import classnames from 'classnames';

import Card from '../../../UI/Card';

import { localizeDate } from '../../../../lib/utils';
import UpdatesButtonArea from '../../../Buttons/UpdatesButtonArea';

const HeaderSection = ({ period, deletePeriod, updatePeriod, className, ...props }) => {
  const { t, i18n } = useTranslation();
  const sectionClassNames = classnames(['details-header', className]);

  const isCurrentPeriod = period.active;
  const isRegistrationOpen = isWithinRange(new Date(), period.signupFrom, period.signupUntil);

  return (
    <section className={sectionClassNames} {...props}>
      <div>
        <h1 className='section-title period-name'>
          {t('Period._singular')} {period.name} - {period.year}
        </h1>

        <UpdatesButtonArea
          onEditClick={updatePeriod}
          onDeleteClick={deletePeriod}
          hideDelete={isCurrentPeriod}
        />
      </div>

      <Card
        fullWidth
        withShadow
        title={t(isCurrentPeriod ? 'Period.Active' : 'Period.Over')}
        className={isCurrentPeriod ? 'period-open' : 'period-closed'}
      >
        {isCurrentPeriod && (
          <>
            <p>
              {isRegistrationOpen
                ? t('Period.RegistrationsOpenUntil')
                : t('Period.RegistrationsClosed')}
            </p>
            {isRegistrationOpen && <p>{localizeDate(period.signupUntil, i18n.language)}</p>}
          </>
        )}
      </Card>
    </section>
  );
};

HeaderSection.defaultProps = {
  className: null,
};

HeaderSection.propTypes = {
  className: PropTypes.string,
  period: PropTypes.shape().isRequired,
  deletePeriod: PropTypes.func.isRequired,
  updatePeriod: PropTypes.func.isRequired,
};

export default HeaderSection;
