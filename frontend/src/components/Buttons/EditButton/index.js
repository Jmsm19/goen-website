import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Edit } from 'styled-icons/fa-solid/Edit';
import { Button } from 'shards-react';

const EditButton = ({ onClick, iconSize, className, ...props }) => (
  <Button
    outline
    theme='secondary'
    className={classnames(['edit-btn', className])}
    onClick={onClick}
    {...props}
  >
    <Edit size={iconSize} />
  </Button>
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
