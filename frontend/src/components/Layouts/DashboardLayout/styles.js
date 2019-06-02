import { styled, makeStyles } from '@material-ui/styles';
import { Menu } from 'styled-icons/material/Menu';

export const useLayoutStyles = makeStyles({
  root: ({ isMobile }) => ({
    '&.dashboard-layout': {
      position: 'relative',
      height: '100vh',
      width: '100vw',

      display: 'grid',
      gridTemplateRows: '70px 1fr',

      '& .top-navigation': {
        width: '100%',

        color: '#fff',
        backgroundColor: 'var(--primary-color)',
        padding: '15px 10px',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& h1': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },

        '& .right-nav': {
          display: 'flex',
          flexDirection: 'row',
          justifyItems: 'flex-end',
          alignItems: 'center',

          '& .open-sidebar-btn, & .logout-btn': {
            letterSpacing: 'normal',
          },

          '& .open-sidebar-btn': {
            border: 'none',
            padding: 10,

            '&:hover': {
              backgroundColor: 'transparent',
              transform: 'none',
              boxShadow: 'none',
            },
          },

          '& .logout-btn': {
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
        gridTemplateColumns: isMobile ? '1fr' : '240px 1fr',
        overflowY: 'auto',
      },

      '& .main-content': {
        padding: 15,
        overflowY: 'auto',
        width: '100%',
      },
    },
  }),
});

export const MenuIcon = styled(Menu)({
  color: '#fff',
  fontWeight: 'bold',
});
