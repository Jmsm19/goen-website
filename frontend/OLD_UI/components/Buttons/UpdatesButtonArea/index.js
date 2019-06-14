import React from 'react';
import PropTypes from 'prop-types';

import EditButton from '../EditButton';
import DeleteButton from '../DeleteButton';

import StyledButtonArea from './styles';

const UpdatesButtonArea = ({ onEditClick, onDeleteClick, hideDelete }) => (
  <StyledButtonArea className='btn-area'>
    <EditButton iconSize={15} onClick={onEditClick} />
    {!hideDelete && <DeleteButton iconSize={15} onClick={onDeleteClick} />}
  </StyledButtonArea>
);

UpdatesButtonArea.defaultProps = {
  hideDelete: false,
};

UpdatesButtonArea.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  hideDelete: PropTypes.bool,
};

export default UpdatesButtonArea;
