import styled from 'styled-components';

import Table from '../../UI/Table';

const StyledTable = styled(Table)`
  .closed-period {
    color: var(--danger-color);
  }

  .active-period {
    color: var(--success-color);
    font-weight: 600;
  }
`;

export default StyledTable;
