import styled from 'styled-components';
import { Card, Badge } from 'antd';

export const StyledCard = styled(Card)`
  width: 160px;
`;

export const StyledBadge = styled(Badge)`
  .ant-scroll-number.ant-badge-count {
    height: max-content;
    padding: 3px 6px;
    border-radius: 50%;
    font-size: 20px;

    ${({ count }) => {
      if (count > 0) {
        return `
          background-color: #f39c12;
        `;
      }
      return ``;
    }}
  }
`;
