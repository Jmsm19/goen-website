import styled from 'styled-components';
import Sider from 'antd/lib/layout/Sider';

export const StyledSidebar = styled(Sider)`
  z-index: 3;
  position: fixed;
  height: 100%;
  background: #fff;
`;

export const StyledMask = styled.div`
  z-index: 2;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
`;
