import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AddCircleOutline as AddIcon } from 'styled-icons/material/AddCircleOutline';
import { CardBody } from 'shards-react';

import StyledCard from './styles';

const ModuleCreateCard = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <StyledCard className='module-create-card' onClick={onClick}>
      <CardBody>
        <div className='create-message'>
          <AddIcon size={30} />
          <p>{t('Module.Create')}</p>
        </div>
      </CardBody>
    </StyledCard>
  );
};

ModuleCreateCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModuleCreateCard;
