import { styled } from '@material-ui/styles';

const StyledNavSection = styled('div')({
  '&.route-section': {
    margin: '20px 0 20px 0',

    '& .links': {
      marginTop: 10,

      '& a': {
        width: 'max-content',
        padding: '0 15px',

        '&:not(:last-child)': {
          marginBottom: 5,
        },
      },
    },
  },
});

export default StyledNavSection;
