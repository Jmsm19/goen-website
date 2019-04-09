import styled from 'styled-components';
import { Switch } from 'antd';
import { media } from '../../../utils/styling';

export const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;

  ${media.tablet`
    grid-template-columns: 1fr;
  `}
`;

export const StyledSwitch = styled(Switch)`
  width: 200px;
  text-transform: uppercase;
  font-weight: bold;
`;
