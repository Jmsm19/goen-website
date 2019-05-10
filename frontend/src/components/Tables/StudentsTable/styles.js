import styled from 'styled-components';

import Table from '../../UI/Table';

const StyledTable = styled(Table)`
  .idle {
    color: var(--danger-color);
    font-weight: 600;
  }

  .paying {
    color: var(--warning-color);
    font-weight: 600;
  }

  .verifying.payment {
    color: var(--info-color);
    font-weight: 600;
  }

  .registered {
    color: var(--success-color);
    font-weight: 600;
  }
`;

export default StyledTable;
