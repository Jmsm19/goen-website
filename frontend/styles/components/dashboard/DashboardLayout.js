import styled from 'styled-components';
import { Layout } from 'antd';
import media from '../../../utils/styling';

export const StyledLayout = styled(Layout)`
  height: 100vh;
`;

export const StyledContent = styled(Layout.Content)`
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;

  ${media.tablet`
    padding: 20px 0;
  `}
`;
