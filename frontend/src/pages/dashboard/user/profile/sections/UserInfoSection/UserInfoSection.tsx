import React from 'react';
import { useTranslation } from 'react-i18next';
import { differenceInCalendarYears } from 'date-fns';

import { formatNationalId } from '../../../../../../lib/utils';
import { UserPropType } from '../../../../../../lib/validation/propTypesValues';

interface Props {
  user: User;
}

const UserInfoSection: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <section className='user-info'>
      <h1 className='user-name'>{user.name}</h1>
      <p className='user-national-id'>{formatNationalId(user.nationalId)}</p>
      <p className='user-email'>{user.email}</p>
      <p className='user-phone-number'>{user.phoneNumber}</p>
      <p className='user-age'>
        {t('User.YearsOld', {
          age: differenceInCalendarYears(new Date(), user.birthDate),
        })}
      </p>
    </section>
  );
};

UserInfoSection.propTypes = {
  user: UserPropType.isRequired,
};

export default UserInfoSection;
