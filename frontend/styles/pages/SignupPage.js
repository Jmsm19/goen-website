/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { media } from '../../utils/styling';

export const StyledPage = styled.main`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  align-content: center;

  ${media.tablet`
    padding: 15px;
  `}

  label {
    text-transform: uppercase;
  }
`;
