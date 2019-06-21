import React from 'react';
import PropTypes from 'prop-types';
import { TrashAlt as Trash } from 'styled-icons/fa-solid/TrashAlt';
import classnames from 'classnames';

import Button from '../../UI/Button';

interface Props extends ButtonProps {
  iconSize?: string | number;
}

const DeleteButton: React.FC<Props> = ({ onClick, iconSize, className, ...props }) => (
  <Button
    outline
    variant='danger'
    icon={<Trash size={iconSize} />}
    className={classnames(['delete-btn', className])}
    onClick={onClick}
    {...props}
  />
);

DeleteButton.defaultProps = {
  className: undefined,
  iconSize: 20,
};

DeleteButton.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
