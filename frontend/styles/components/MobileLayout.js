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
export const StyledLayout = styled(Layout)`
  display: grid;
  min-height: 100%;
  grid-template-rows: 1fr auto;
`;

// remove isAuth from props
export const StyledContent = styled(({ isAuth, ...rest }) => <Layout.Content {...rest} />)`
  display: ${({ isAuth }) => (!isAuth ? 'grid' : 'block')};
  align-items: ${({ isAuth }) => (isAuth ? 'center' : undefined)};
`;
