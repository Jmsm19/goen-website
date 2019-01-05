/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Avatar, Button, Icon } from 'antd';
import {
  StyledProfile,
  StyledCard,
  SectionTitle,
  UserProfileUpper,
  UserUpperFirstCol,
  UserUpperSecondCol,
  UserUpperThirdCol,
  UserProfileLower
} from '../../styles/components/UserProfile';

function UserProfile({
  t,
  toggleEdition,
  user: { name, clan, birth_date, email, phone_number }
}) {
  const clanName = clan ? clan.toLowerCase() : null;
  return (
    <StyledProfile>
      <StyledCard>
        <UserProfileUpper>
          <UserUpperFirstCol>
            <Avatar
              alt={clanName || 'user profile'}
              title={clanName || 'user'}
              shape={clanName ? 'square' : 'circle'}
              src={clanName && `/static/images/clans/${clanName}.png`}
              size={200}
              icon="user" />
          </UserUpperFirstCol>
          <UserUpperSecondCol>
            <h1>{name}</h1>
            <h2>{moment().diff(birth_date.split(' '[0]), 'years')} años</h2>
            <h2>{email}</h2>
            <h2>{phone_number}</h2>
          </UserUpperSecondCol>
          <UserUpperThirdCol>
            <Button type="default" onClick={toggleEdition}>
              <Icon type="edit" /> {t('EditProfile')}
            </Button>
          </UserUpperThirdCol>
        </UserProfileUpper>
      </StyledCard>

      <SectionTitle>{t('AcademicInfo')}</SectionTitle>

      <StyledCard loading={false}>
        <UserProfileLower>
          <p><b>{t('CurrentModule')}:</b> ¯\_(ツ)_/¯ </p>
        </UserProfileLower>
      </StyledCard>
    </StyledProfile>
  )
}

UserProfile.propTypes = {
  t: PropTypes.func.isRequired,
  toggleEdition: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    clan: PropTypes.string,
    birth_date: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
}

export default UserProfile;

