import styled from 'styled-components';
import { Spinner3 as Spinner } from 'styled-icons/evil/Spinner3';

const StyledIcon = styled(Spinner)`
  &.spinner {
    display: block;
    margin: 0 auto;
    color: var(--primary-color);

    animation: 2s linear infinite rotation;
  }
`;

export default StyledIcon;
