import { styled, makeStyles } from '@material-ui/styles';
import { Menu } from 'styled-icons/material/Menu';

export const useLayoutStyles = makeStyles({
  root: ({ isMobile }) => ({
    '&.dashboard-layout': {
      position: 'relative',
      height: '100vh',
      width: '100vw',

      display: 'grid',
      gridTemplateRows: 'auto 1fr',

      '& .top-navigation': {
        width: '100%',
        color: '#fff',

        '& .right-nav': {
          '& .logout-btn': {
            textTransform: 'none',
            letterSpacing: 'normal',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.7)',

            '&:hover': {
              transform: 'none',
              boxShadow: 'none',
              color: '#fff',
            },

            '&:not(:last-child)': {
              marginRight: 10,
            },
          },

          '& a': {
            color: 'rgba(255, 255, 255, 0.7)',
            padding: 15,

            '&:not(:last-child)': {
              display: 'block',
              marginRight: 10,
            },

            '&.active': {
              color: '#fff',
              fontWeight: 600,
            },

            '&:hover': {
              color: '#fff',
            },
          },
        },
      },

      '& .inner-layout': {
        display: 'grid',
        gridTemplateColumns: '1fr',
        overflowY: 'auto',

        '& main': {
          marginLeft: !isMobile ? 240 : 'auto',
        },
      },

      '& .main-content': {
        padding: 15,
        overflowY: 'auto',
        width: isMobile ? '100%' : 'auto',
      },
    },
  }),
});

export const MenuIcon = styled(Menu)({
  color: '#fff',
  fontWeight: 'bold',
});
