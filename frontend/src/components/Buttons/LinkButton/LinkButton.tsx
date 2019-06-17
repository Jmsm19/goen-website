import React from 'react';
import PropTypes from 'prop-types';
import { Link, LinkProps } from 'react-router-dom';

import Button from '../../UI/Button';

interface LinkButtonProps extends LinkProps {
  btnProps: ButtonProps;
}

const LinkButton: React.FC<LinkButtonProps> = ({ to, btnProps, ...props }) => (
  <Link to={to} {...props}>
    <Button {...btnProps} />
  </Link>
);

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  btnProps: PropTypes.oneOfType([PropTypes.any, PropTypes.shape({})]).isRequired,
};

export default LinkButton;
