import { styled } from '@material-ui/styles';

const StyledNavSection = styled('div')({
  '&.route-section': {
    margin: '10px 0',

    '& .links': {
      marginTop: 10,

      '& a': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
      },
    },
  },
});

export default StyledNavSection;
