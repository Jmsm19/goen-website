import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'styled-icons/fa-solid/Edit';
import classnames from 'classnames';

import Button from '../../UI/Button';

interface Props extends ButtonProps {
  iconSize?: string | number;
}

const EditButton: React.FC<Props> = ({ onClick, iconSize, className, ...props }) => (
  <Button
    variant='secondary'
    icon={<Edit size={iconSize} />}
    className={classnames(['edit-btn', className])}
    onClick={onClick}
    {...props}
  />
);

EditButton.defaultProps = {
  className: undefined,
  iconSize: 20,
};

EditButton.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
