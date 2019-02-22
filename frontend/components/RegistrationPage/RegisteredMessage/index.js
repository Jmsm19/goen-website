import React from 'react';
import PropTypes from 'prop-types';

function RegisteredMessage({ t }) {
  return (
    <>
      <h2>You are registered</h2>
    </>
  );
}

RegisteredMessage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default RegisteredMessage;
