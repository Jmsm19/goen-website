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
  UserProfileLower,
} from '../../styles/components/UserProfile';
import ModulesTable from '../ModulesTable';

function UserProfile({ t, toggleEdition, user }) {
  const { name, clan, birthDate, email, phoneNumber, currentModule, passedModules } = user;
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
              size={clanName ? 200 : 150}
              icon='user'
            />
          </UserUpperFirstCol>
          <UserUpperSecondCol>
            <h1>{name}</h1>
            <h2>{moment().diff(birthDate.split(' '[0]), 'years')} años</h2>
            <h2>{email}</h2>
            <h2>{phoneNumber}</h2>
          </UserUpperSecondCol>
          <UserUpperThirdCol>
            <Button type='default' onClick={toggleEdition}>
              <Icon type='edit' /> {t('EditProfile')}
            </Button>
          </UserUpperThirdCol>
        </UserProfileUpper>
      </StyledCard>

      <SectionTitle>{t('AcademicInfo')}</SectionTitle>

      {currentModule && (
        <StyledCard loading={false}>
          <UserProfileLower>
            <h3>{t('CurrentModule')}</h3>
            {currentModule.registrationStatus === 'registered' ? (
              <h4>
                {currentModule.name} {currentModule.section}{' '}
              </h4>
            ) : (
              <h4>
                You are currently in the process of registering in {currentModule.name}{' '}
                {currentModule.section}.
              </h4>
            )}
          </UserProfileLower>
        </StyledCard>
      )}

      <StyledCard bodyStyle={{ padding: '0' }}>
        <ModulesTable t={t} modules={passedModules} />
      </StyledCard>
    </StyledProfile>
  );
}

UserProfile.propTypes = {
  t: PropTypes.func.isRequired,
  toggleEdition: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    clan: PropTypes.string,
    birthDate: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
