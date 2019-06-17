import { styled, makeStyles } from '@material-ui/styles';
import { Menu } from 'styled-icons/material/Menu';

interface LayoutProps {
  isMobile: boolean;
}

export const useLayoutStyles = makeStyles({
  root: ({ isMobile }: LayoutProps) => ({
    '&.dashboard-layout': {
      position: 'relative',
      height: '100vh',
      width: '100vw',

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
        paddingTop: isMobile ? 16 : 32,
        // width: isMobile ? '100%' : 'auto',
        width: 'auto',
        height: `calc(100% - ${isMobile ? '56px' : '64px'})`,
        marginLeft: !isMobile ? 240 : 'auto',
        overflowY: 'auto',
      },
    },
  }),
});

export const MenuIcon = styled(Menu)({
  color: '#fff',
  fontWeight: 'bold',
});
