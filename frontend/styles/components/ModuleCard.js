import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

const StyledModuleCard = styled(({ canRegister, ...rest }) => <Card {...rest} />)`
  margin-bottom: 15px;
  max-height: 190px;

  ${({ canRegister }) =>
    !canRegister &&
    `
    &:hover {
      cursor: not-allowed;
  `}
`;

export default StyledModuleCard;
