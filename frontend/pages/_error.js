import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    // eslint-disable-next-line no-nested-ternary
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Alert
        style={{ minWidth: 'fit-content', width: '100%', maxWidth: '900px', margin: '0 auto' }}
        showIcon
        type='error'
        message={`Error ${statusCode || ''}`}
        description='🚧 Page under construction... Maybe 🚧'
      />
    );
  }
}

ErrorPage.propTypes = {
  statusCode: PropTypes.number.isRequired,
};

export default ErrorPage;
