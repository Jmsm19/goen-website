/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import media from '../../utils/styling';

export const StyledButtonArea = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(2, minmax(max-content, 200px));
  grid-template-rows: auto;

  button {
    font-weight: bold;
    text-transform: uppercase;
  }

  ${media.tablet`
    grid-template-columns: 1fr;
    grid-gap: 10px;

    button:first-child {
      grid-row: 2;
    }
  `}
`;
