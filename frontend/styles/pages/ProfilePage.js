/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';
import media from '../../utils/styling';

const StyledPage = styled(({ isEditing, ...rest }) => <div {...rest} />)`
  display: grid;
  ${({ isEditing }) =>
    isEditing &&
    `
    padding: 30px 50px;
    grid-template-columns: auto 1fr;
    grid-gap: 30px;
  `}

  ${media.phone`
    padding: ${({ isEditing }) => isEditing && '45px 25px 10px'};;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-gap: 0;
    justify-content: center;

    .ant-avatar {
      display: ${({ isEditing }) => isEditing && 'none'};
    }
  `}
`;

export default StyledPage;
