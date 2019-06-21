import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AddCircleOutline as AddIcon } from 'styled-icons/material/AddCircleOutline';

import StyledCard from './styles';

interface Props {
  onClick: BtnClick;
}

const ModuleCreateCard: React.FC<Props> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <StyledCard hoverable fullWidth className='module-create-card' onClick={onClick}>
      <div className='create-message'>
        <AddIcon size={30} />
        <p>{t('Module.Create')}</p>
      </div>
    </StyledCard>
  );
};

ModuleCreateCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModuleCreateCard;
