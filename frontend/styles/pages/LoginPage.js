import styled from 'styled-components';
import media from '../../utils/styling';

export const StyledPage = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  align-content: center;

  label {
    text-transform: uppercase;
  }
`;

export const StyledLogo = styled.img`
  display: block;
  width: 180px;
  margin: 0 auto;
  margin-bottom: 20px;

  ${media.tablet`
    width: 150px;
    margin-bottom: 35px;
  `}
`;