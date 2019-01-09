import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { Layout, Radio } from 'antd';
import { withNamespaces } from '../../i18n';

const { publicRuntimeConfig } = getConfig();

export class Footer extends Component {
  changeLocale = ({ target: { value } }) => {
    const { i18n } = this.props;

    if (i18n.language !== value) {
      i18n.changeLanguage(value);
    }
  };

  render() {
    const { t, i18n } = this.props;
    const RadioButton = Radio.Button;
    const RadioGroup = Radio.Group;

    return (
      <Layout.Footer style={{ textAlign: 'center', height: '100%', padding: '0 50px 30px' }}>
        <p>&copy; 2018 - {publicRuntimeConfig.SITE_NAME}</p>

        <RadioGroup onChange={this.changeLocale} defaultValue={i18n.language || 'es'}>
          <RadioButton value='es'>{t('Spanish')}</RadioButton>
          <RadioButton value='en'>{t('English')}</RadioButton>
        </RadioGroup>
      </Layout.Footer>
    );
  }
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string,
    changeLanguage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNamespaces('common')(Footer);
