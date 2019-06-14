import React from 'react';
import PropTypes from 'prop-types';
import { TrashAlt as Trash } from 'styled-icons/fa-solid/TrashAlt';
import classnames from 'classnames';

import Button from '../../UI/Button';

const DeleteButton = ({ onClick, iconSize, className, ...props }) => (
  <Button
    outline
    type='danger'
    icon={<Trash size={iconSize} />}
    className={classnames(['delete-btn', className])}
    onClick={onClick}
    {...props}
  />
);

DeleteButton.defaultProps = {
  className: null,
  iconSize: 20,
};

DeleteButton.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
