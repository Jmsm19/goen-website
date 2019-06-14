import { styled } from '@material-ui/styles';

const StyledContainer = styled('div')({
  '&.module-summary': {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',

    '& img': {
      width: 100,
      minHeight: 100,
    },

    '& .module-info': {
      paddingLeft: 10,

      '& .module-name': {
        marginBottom: '0.5rem',
      },

      '& .module-schedule': {
        marginBottom: '1rem',
      },
    },
  },
});

export default StyledContainer;
