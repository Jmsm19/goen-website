import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 0 2px;
  position: relative;
  width: max-content;

  .overlay {
    padding-top: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(244, 244, 244, 0.6);

    display: grid;
    justify-content: center;
    align-content: center;

    .loading {
      svg {
        height: 25px;
      }
    }
  }
`;

export default StyledContainer;
