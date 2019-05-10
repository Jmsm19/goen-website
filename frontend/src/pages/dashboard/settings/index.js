import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Switch from '../../../components/UI/Switch';

import { AuthContext } from '../../../context/AuthContext';
import { DataContext } from '../../../context/DataContext';
import LanguageSelector from '../../../components/LanguageSelector';

import { StyledSection, StyledPage, StyledSetting } from './styles';

const SettingsPage = props => {
  const { t } = useTranslation();
  const { authUser } = useContext(AuthContext);
  const { settings, updateSetting } = useContext(DataContext);
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
                enabled={userSignupActive}
                className='language-switch'
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
