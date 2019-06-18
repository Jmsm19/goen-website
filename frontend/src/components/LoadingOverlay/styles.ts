import { styled } from '@material-ui/styles';

const StyledContainer = styled('div')({
  padding: '0 2px',
  position: 'relative',
  width: 'max-content',

  '& .overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(244, 244, 244, 0.6)',

    display: 'grid',
    justifyContent: 'center',

    '& .loading': {
      paddingTop: 6,

      '& .loading-container': {
        gridTemplateRows: 'auto',
        '& svg': {
          height: 25,
        },
      },
    },
  },
});

export default StyledContainer;
