/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';
import { Card, Icon, List } from 'antd';

export const StyledCard = styled(Card)`
  width: 160px;
`;

export const StyledListItem = styled(List.Item)`
  h4 {
    margin: 0;
    font-weight: bold;
    color: var(--light-primary-color);
  }
  .ant-list-item-meta-content {
    display: flex;
    align-items: center;
  }
`;

export const StyledIcon = styled(({ count, ...rest }) => <Icon {...rest} />)`
  margin-right: 8px;
  font-weight: bold;

  ${({ count }) => {
    if (count >= 10) {
      return `
          color: #27ae60;
        `;
    }

    if (count > 0) {
      return `
          color: #f39c12;
        `;
    }
    return ``;
  }}
`;
