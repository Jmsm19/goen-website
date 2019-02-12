import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Divider } from 'antd';
import { GlobalSettingsConsumer } from '../../context/GlobalSettingsContext';

function GlobalSettingsArea({ t }) {
  return (
    <>
      <Divider orientation='left'>{t('GlobalSettings')}</Divider>

      <GlobalSettingsConsumer>
        {({ updating, updateSetting, settings }) => (
          <div className='settings-area'>
            <p>{t('AllowUserSignup')}</p>
            <Switch
              loading={updating}
              defaultChecked={settings.userSignupActive}
              onChange={value => updateSetting('user_signup_active', value)}
            />
          </div>
        )}
      </GlobalSettingsConsumer>
    </>
  );
}

GlobalSettingsArea.propTypes = {
  t: PropTypes.func.isRequired,
};

export default GlobalSettingsArea;
