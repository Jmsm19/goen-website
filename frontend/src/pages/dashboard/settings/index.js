import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from 'shards-react';

import { useAuth } from '../../../store/context/AuthContext';
import { useSettings } from '../../../store/context/SettingsContext';

import Switch from '../../../components/UI/Switch';
import LanguageSelector from '../../../components/LanguageSelector';

import { StyledSection, StyledSetting } from './styles';

const SettingsPage = props => {
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const { settings, updateSetting } = useSettings();
  const { userSignupActive } = settings;

  return (
    <Container className='dashboard-settings'>
      {authUser.isAdmin && (
        <StyledSection>
          <h3 className='section-title'>{t('Setting.GlobalSettings')}</h3>
          <Container>
            <StyledSetting>
              <p>{t('Setting.RegistrationsEnabled')}: </p>
              <Switch
                enabled={userSignupActive}
                className='user-signup-switch'
                onChange={() => updateSetting('userSignupActive', !userSignupActive)}
              />
            </StyledSetting>
          </Container>
        </StyledSection>
      )}

      <StyledSection>
        <h3 className='section-title'>{t('Setting.UserPreferences')}</h3>
        <Container>
          <StyledSetting>
            <p>{t('Setting.Language')}:</p>
            <LanguageSelector />
          </StyledSetting>
        </Container>
      </StyledSection>
    </Container>
  );
};

SettingsPage.propTypes = {};

export default SettingsPage;
