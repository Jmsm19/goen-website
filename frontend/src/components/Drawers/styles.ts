import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const drawerWidth = 240;

const useDrawerStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

    '& .drawer-toolbar-gap': {
      marginBottom: '1rem',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    overflowX: 'hidden',
    padding: '0 1.3rem 1rem 1rem',
    border: 0,

    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'var(--black)',

    '& .logout-btn': {
      width: '100%',
      textTransform: 'none',
      color: 'inherit',
      letterSpacing: 'normal',
      fontWeight: 400,
      justifyContent: 'flex-start',
      padding: 5,

      '&:hover': {
        color: '#fff !important',
        cursor: 'pointer',
      },
    },

    '& a': {
      color: 'inherit',
      display: 'block',
      transition: 'all ease',
      padding: 5,

      '&.active': {
        color: '#fff',
        fontWeight: 600,
      },

      '&:hover': {
        color: '#fff',
      },
    },
  },
  toolbar: theme.mixins.toolbar,
}));

export default useDrawerStyles;
