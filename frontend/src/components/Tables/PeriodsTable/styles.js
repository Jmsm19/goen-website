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

  .delete-btn {
    opacity: 0;
  }

  .table-body-row:hover {
    .delete-btn {
      opacity: 1;
    }
  }
`;

export default StyledTable;
