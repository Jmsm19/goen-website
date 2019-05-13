import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'styled-icons/fa-solid/Edit';
import classnames from 'classnames';

import Button from '../../UI/Button';

const EditButton = ({ onClick, iconSize, className, ...props }) => (
  <Button
    type='secondary'
    icon={<Edit size={iconSize} />}
    className={classnames(['edit-btn', className])}
    onClick={onClick}
    {...props}
  />
);

EditButton.defaultProps = {
  className: null,
  iconSize: 20,
};

EditButton.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
