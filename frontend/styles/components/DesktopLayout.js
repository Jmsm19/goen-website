/* eslint-disable react/react-in-jsx-scope */
import { Layout } from 'antd';
import styled from 'styled-components';
// import media from '../../utils/styling';

export const StyledMain = styled.main`
  display: grid;

  ${({ isAuth }) =>
    !isAuth &&
    `
    padding: 30px;
  `}
`;

// remove isAuth from props
export const StyledLayout = styled(({ isAuth, ...rest }) => <Layout {...rest} />)`
  display: grid;
  min-height: 100vh;
  grid-template-rows: ${({ isAuth }) => (isAuth ? 'auto 1fr auto' : '1fr auto')};
`;

// remove isAuth from props
export const StyledContent = styled(({ isAuth, isMobile, ...rest }) => (
  <Layout.Content {...rest} />
))`
  display: ${({ isAuth }) => (!isAuth ? 'grid' : 'block')};
  align-items: ${({ isAuth }) => (isAuth ? 'center' : undefined)};
  ${({ isMobile }) =>
    !isMobile &&
    `
    margin-top: 53px;
  `}
`;

export const StyledHeader = styled(Layout.Header)`
  padding: 0;
  height: 100%;
`;
