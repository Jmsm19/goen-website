import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TrashAlt as Trash } from 'styled-icons/fa-solid/TrashAlt';
import { Button } from 'shards-react';

const DeleteButton = ({ onClick, iconSize, className, ...props }) => (
  <Button
    theme='danger'
    className={classnames(['delete-btn', className])}
    onClick={onClick}
    {...props}
  >
    <Trash size={iconSize} />
  </Button>
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
