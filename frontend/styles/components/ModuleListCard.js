import styled from 'styled-components';
import { Card, Badge } from 'antd';

export const StyledCard = styled(Card)`
  width: 160px;
`;

export const StyledBadge = styled(Badge)`
  .ant-scroll-number.ant-badge-count {
    font-size: 16px;
    font-weight: bold;

    ${({ count }) => {
      if (count >= 10) {
        return `
          background-color: #27ae60;
        `;
      }

      if (count > 0) {
        return `
          background-color: #f39c12;
        `;
      }
      return ``;
    }}
  }
`;
