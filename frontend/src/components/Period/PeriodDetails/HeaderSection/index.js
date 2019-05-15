import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { isWithinRange } from 'date-fns';
import classnames from 'classnames';

import { useAuth } from '../../../../context/AuthContext';

import DeleteButton from '../../../Buttons/DeleteButton';
import EditButton from '../../../Buttons/EditButton';
import Card from '../../../UI/Card';

import { localizeDate } from '../../../../lib/utils';

const HeaderSection = ({ period, deletePeriod, updatePeriod, className, ...props }) => {
  const { t, i18n } = useTranslation();
  const { authUser } = useAuth();
  const sectionClassNames = classnames(['details-header', className]);

  const isCurrentPeriod = period.active;
  const isRegistrationOpen = isWithinRange(new Date(), period.signupFrom, period.signupUntil);

  return (
    <section className={sectionClassNames} {...props}>
      <div>
        <h1 className='section-title period-name'>
          {t('Period._singular')} {period.name} - {period.year}
        </h1>
        {authUser.isAdmin && (
          <div className='btn-area'>
            <EditButton iconSize={15} onClick={updatePeriod} />
            {!isCurrentPeriod && <DeleteButton iconSize={15} onClick={deletePeriod} />}
          </div>
        )}
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
