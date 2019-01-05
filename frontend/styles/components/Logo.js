import styled from 'styled-components';
import media from '../../utils/styling';

const StyledLogo = styled.div`
  display: block;
  height:43px;
  width: 43px;
  background-color: #fff;
  background: url('/static/images/goen-logo-small.jpg') no-repeat center;
  background-size: contain;
  margin: 5px 0;
  margin-left: 50px;

  ${media.tablet`
    margin-left: 15px;
  `}
`;

export default StyledLogo;