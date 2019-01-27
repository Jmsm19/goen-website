import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';

export const StyledHeader = styled(Layout.Header)`
  padding: 0;
  display: grid;
  justify-content: flex-end;
  background: #fff;
  align-content: flex-end;
`;

export const StyledHeaderMenuItem = styled(Menu.Item)`
  margin-left: auto;
  line-height: 64px;
`;

export const StyledHeaderHamburgerIcon = styled(Icon)`
  font-size: 30px;
  padding: 15px 20px;
`;
