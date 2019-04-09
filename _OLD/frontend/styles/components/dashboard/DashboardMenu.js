import styled from 'styled-components';
import { Menu } from 'antd';
// import media from '../../../utils/styling';

export const StyledNoBorderMenu = styled(Menu)`
  border: 0;
`;

export const StyledMenuItem = styled(Menu.Item)`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;
