import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

interface Props {
  isActivated: boolean;
  heading: string;
  message?: string;
}

const ActivationMessage: React.FC<Props> = ({ isActivated, heading, message }) => {
  const className = classnames({
    success: isActivated,
    error: !isActivated,
  });
  return (
    <>
      <h1 className={className}>{heading}</h1>
      {message && <p>{message}</p>}
    </>
  );
};

ActivationMessage.defaultProps = {
  message: '',
};

ActivationMessage.propTypes = {
  isActivated: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default ActivationMessage;
