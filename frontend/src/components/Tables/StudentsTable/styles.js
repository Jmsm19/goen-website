import styled from 'styled-components';

import Table from '../../UI/Table';

const StyledTable = styled(Table)`
  .idle {
    color: var(--danger-color);
  }

  .paying {
    color: var(--warning-color);
  }

  .verifying.payment {
    color: var(--warning-color);
  }

  .registered {
    color: var(--success-color);
  }
`;

export default StyledTable;
