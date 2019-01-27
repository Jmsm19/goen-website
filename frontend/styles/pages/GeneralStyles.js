import styled from 'styled-components';
import { Icon, Collapse, Table } from 'antd';

export const StyledFaintIcon = styled(Icon)`
  color: rgba(0, 0, 0, 0.25);
`;

export const CardCollapsingPanel = styled(Collapse.Panel)`
  .ant-collapse-content-box {
    padding: 0;
  }
`;

export const StyledTable = styled(Table)`
  .actions-column {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;
