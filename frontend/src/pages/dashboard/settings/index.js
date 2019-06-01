import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@material-ui/core';

import { useAuth } from '../../../store/context/AuthContext';
import { useSettings } from '../../../store/context/SettingsContext';

import LanguageSelector from '../../../components/LanguageSelector';

import { StyledSection, StyledPage, StyledSetting } from './styles';

const SettingsPage = props => {
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const { settings, updateSetting } = useSettings();
  const { userSignupActive } = settings;

  return (
    <StyledPage className='dashboard-settings'>
      <h1>{t('Settings')}</h1>

      {authUser.isAdmin && (
        <>
          <StyledSection>
            <h2>{t('Setting.GlobalSettings')}</h2>
            <StyledSetting>
              <p>{t('Setting.RegistrationsEnabled')}: </p>
              <Switch
                checked={userSignupActive}
                color='primary'
                className='user-signup-switch'
                onChange={() => updateSetting('userSignupActive', !userSignupActive)}
              />
            </StyledSetting>
          </StyledSection>
        </>
      )}

      <StyledSection>
        <h2>{t('Setting.UserPreferences')}</h2>
        <StyledSetting>
          <p>{t('Setting.Language')}:</p>
          <LanguageSelector />
        </StyledSetting>
      </StyledSection>
    </StyledPage>
  );
};

SettingsPage.propTypes = {};

export default SettingsPage;
