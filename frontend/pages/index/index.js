import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { Button } from 'antd';
import { GetData } from '../../utils/fetch';
import { withNamespaces } from '../../i18n';

export class IndexPage extends Component {
  state = {
    greeting: '',
    loading: false,
  }

  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  getData = () => {
    this.setState({
      loading: true
    });
    NProgress.start();
    GetData()
      .then(data => data.json())
      .then(json => {
        this.setState({
          greeting: json.greeting,
          loading: false,
        })
        NProgress.done();
      })
      .catch(error => {
        this.setState({
          loading: false,
        })
        NProgress.done();
      })
  }

  render() {
    const { greeting, loading } = this.state;
    const { t } = this.props;

    return (
      <div className="indexPage">
        <h1>{greeting || 'Hello from Next'}</h1>
        <Button type="primary" loading={loading}
          onClick={this.getData}>{t('getData')}</Button>
      </div>
    )
  }
}

IndexPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(IndexPage);