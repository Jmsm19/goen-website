import React from 'react';
import PropTypes from 'prop-types';
import StyledContainer from '../../../styles/components/Registration/BankInfo';

function BankInfo({ accountNumber, name, nationalId, t }) {
  return (
    <StyledContainer>
      <div>
        <h3>{t('AccountNumber')}</h3>
        <p>{accountNumber}</p>
      </div>
      <div>
        <h3>{t('BeneficiaryName')}</h3>
        <p>{name}</p>
      </div>
      <div>
        <h3>{t('NationalId')}</h3>
        <p>{nationalId}</p>
      </div>
    </StyledContainer>
  );
}

BankInfo.propTypes = {
  t: PropTypes.func.isRequired,
  accountNumber: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nationalId: PropTypes.string.isRequired,
};

export default BankInfo;
