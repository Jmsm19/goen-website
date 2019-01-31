import styled from 'styled-components';
import media from '../../utils/styling';

const StyledPage = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 30px;

  ${media.phone`
    padding: 0 15px;
  `}
`;

export default StyledPage;
