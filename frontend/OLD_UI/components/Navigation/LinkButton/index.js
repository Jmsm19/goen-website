import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button';

const LinkButton = ({ to, btnProps, ...props }) => (
  <Link to={to} {...props}>
    <Button {...btnProps} />
  </Link>
);

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  btnProps: PropTypes.shape({
    ...Button.propTypes,
  }).isRequired,
};

export default LinkButton;
