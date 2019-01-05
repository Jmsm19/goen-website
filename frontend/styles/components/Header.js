import styled from 'styled-components';
import { Menu } from 'antd';
// import media from '../../utils/styling';

export const StyledNav = styled.nav`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto 1fr;

  & > div {
    background-color: #fff;
  }
`;

export const StyledMenu = styled(Menu)`
  border-bottom: 0;
  display: grid;
  align-content: flex-end;
`;