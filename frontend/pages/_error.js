import React from 'react';
import PropTypes from 'prop-types';
import { StyledAlert } from '../styles/pages/error';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    // eslint-disable-next-line no-nested-ternary
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <StyledAlert
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
