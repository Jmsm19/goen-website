import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Select } from 'antd';
import RequireAuthentication from '../../../components/RequireAuthentication';
import { withNamespaces, i18n } from '../../../i18n';
import UserProfileEditionForm from '../../../components/UserProfileEditionForm';
import StyledPage from '../../../styles/pages/dashboard/SettingsPage';
import GlobalSettingsArea from '../../../components/GlobalSettingsArea';

class SettingsPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  render() {
    const { t } = this.props;
    const { Option } = Select;
    return (
      <RequireAuthentication t={t}>
        {({ handleUserUpdate, authUser, fieldErrors }) => (
          <StyledPage>
            <Divider orientation='left'>{t('UserDetails')}</Divider>

            <div className='settings-area'>
              <UserProfileEditionForm
                t={t}
                updateUser={handleUserUpdate}
                user={authUser}
                fieldErrors={fieldErrors}
              />
            </div>

            <Divider orientation='left'>{t('PersonalSettings')}</Divider>

            <div className='settings-area'>
              <p>{t('Language')}</p>
              <Select
                id='language'
                name='language'
                defaultValue={i18n.language}
                style={{ width: 120 }}
                onChange={this.changeLanguage}
              >
                <Option value='es'>{t('Spanish')}</Option>
                <Option value='en'>{t('English')}</Option>
              </Select>
            </div>

            {authUser && authUser.isAdmin && <GlobalSettingsArea t={t} />}
          </StyledPage>
        )}
      </RequireAuthentication>
    );
  }
}

SettingsPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(SettingsPage);
