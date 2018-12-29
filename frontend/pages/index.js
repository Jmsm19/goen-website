import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import GET from '../utils/fetch';
import { withNamespaces } from '../i18n';

export class IndexPage extends Component {
  state = {
    greeting: '',
  }

  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  getData = () => {
    GET()
      .then(data => {
        NProgress.start();
        return data.json();
      })
      .then(json => {
        this.setState({
          greeting: json.greeting
        })
        NProgress.done();
      })
  }

  render() {
    const { greeting } = this.state;
    const { t } = this.props;

    return (
      <div>
        <h1>{greeting || 'Hello from Next'}</h1>
        <button type="button" onClick={this.getData}>{t('getData')}</button>
      </div>
    )
  }
}

IndexPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(IndexPage);