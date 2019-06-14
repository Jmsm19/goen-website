import { styled } from '@material-ui/core';

const StyledLayout = styled('div')({
  '&.layout': {
    position: 'relative',
    zIndex: 0,
    height: '100%',
    backgroundColor: 'var(--primary-color)',

    display: 'grid',
    gridTemplate: `
      'main' 1fr
      'footer' auto
    `,

    '&::after': {
      content: `' '`,
      zIndex: -1,
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: '#232323',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 30%, 0% 60%)',
    },

    '& main:': {
      gridArea: 'main',
    },

    '& footer': {
      color: '#fff',
      gridArea: 'footer',
      textAlign: 'center',
      padding: 30,
    },
  },
});

export default StyledLayout;
