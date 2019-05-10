import React from 'react';
import styled from 'styled-components';

const StyledForm = styled(({ isMobile, ...props }) => <form {...props} />)`
  height: 100%;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 1fr auto;

  .form-fields {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: ${({ isMobile }) => (isMobile ? '1fr' : '1fr 1fr')};
    min-height: 90px;
  }

  .button-area {
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    justify-content: flex-end;

    .btn:first-child {
      margin-right: ${({ isMobile }) => (isMobile ? null : '1rem')};
      margin-bottom: ${({ isMobile }) => (isMobile ? '0.5rem' : null)};
    }
  }
`;

export default StyledForm;
