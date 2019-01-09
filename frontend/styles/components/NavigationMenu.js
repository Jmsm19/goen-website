/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';
import { Menu } from 'antd';
import media from '../../utils/styling';

const { SubMenu } = Menu;

export const StyleSubMenu = styled(({ isMobile, ...rest }) => <SubMenu {...rest} />)`
  ${({ isMobile }) =>
    !isMobile &&
    `
    display: inline-block;
    margin-left: auto;
  `};
`;

export const StyledNav = styled.nav`
  ${({ isMobile }) =>
    !isMobile &&
    `
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: auto 1fr;
  `}

  & > div {
    background-color: #fff;
  }
`;

export const StyledLogo = styled.div`
  display: block;
  height: 43px;
  width: 43px;
  background-color: #fff;
  background: url(/static/images/goen-logo-small.jpg) no-repeat center;
  background-size: contain;
  margin: 5px 0;
  margin-left: 50px;

  ${media.tablet`
    margin-left: 15px;
  `}
`;

export const StyledMenu = styled(Menu)`
  border-bottom: 0;
  display: grid;
  align-content: flex-end;
`;
