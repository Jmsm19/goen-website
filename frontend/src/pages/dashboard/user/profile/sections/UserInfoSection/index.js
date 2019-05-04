import React from 'react';
import PropTypes from 'prop-types';
import { differenceInCalendarYears } from 'date-fns';

const UserInfoSection = ({ t, user }) => (
  <section className='user-info'>
    <h1 className='user-name'>{user.name}</h1>
    <p className='user-national-id'>{user.nationalId}</p>
    <p className='user-email'>{user.email}</p>
    <p className='user-phone-number'>{user.phoneNumber}</p>
    <p className='user-age'>
      {t('User.YearsOld', {
        age: differenceInCalendarYears(new Date(), user.birthDate),
      })}
    </p>
  </section>
);

UserInfoSection.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

export default UserInfoSection;
