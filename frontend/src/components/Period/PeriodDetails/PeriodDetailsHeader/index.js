import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isWithinRange } from 'date-fns';
import classnames from 'classnames';

import { useAuth } from '../../../../context/AuthContext';

import Card from '../../../UI/Card';
import PeriodName from '../../PeriodName';
import UpdatesButtonArea from '../../../Buttons/UpdatesButtonArea';

import { localizeDate } from '../../../../lib/utils';

const PeriodDetailsHeader = ({ period, deletePeriod, updatePeriod, className, ...props }) => {
  const { t, i18n } = useTranslation();
  const { authUser } = useAuth();
  const sectionClassNames = classnames(['details-header', className]);

  const isCurrentPeriod = period.active;
  const isRegistrationOpen = isWithinRange(new Date(), period.signupFrom, period.signupUntil);

  return (
    <section className={sectionClassNames} {...props}>
      <div>
        <h1 className='section-title period-name'>
          <PeriodName period={period} />
        </h1>

        {authUser.isAdmin && (
          <UpdatesButtonArea
            onEditClick={updatePeriod}
            onDeleteClick={deletePeriod}
            hideDelete={isCurrentPeriod}
          />
        )}
      </div>

      {authUser.isAdmin && (
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
      )}
    </section>
  );
};

PeriodDetailsHeader.defaultProps = {
  className: null,
  updatePeriod: () => null,
  deletePeriod: () => null,
};

PeriodDetailsHeader.propTypes = {
  className: PropTypes.string,
  period: PropTypes.shape().isRequired,
  deletePeriod: PropTypes.func,
  updatePeriod: PropTypes.func,
};

export default PeriodDetailsHeader;
