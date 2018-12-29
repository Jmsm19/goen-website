import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import { withNamespaces } from '../../i18n';

const { publicRuntimeConfig } = getConfig();

class Footer extends Component {
  changeLocale = (locale) => {
    const { i18n } = this.props;

    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }

  render() {
    const { t } = this.props;

    return (
      <div>
        <p>&copy; 2018 - {publicRuntimeConfig.SITE_NAME}</p>
        <div>
          <button type="button"
            onClick={() => this.changeLocale('es')}>{t('Spanish')}</button>
          <button type="button"
            onClick={() => this.changeLocale('en')}>{t('English')}</button>
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired,
    changeLanguage: PropTypes.func.isRequired,
  }).isRequired,
}

export default withNamespaces('common')(Footer);