import { makeStyles, styled } from '@material-ui/styles';
import { Close as X } from 'styled-icons/evil/Close';

export const useModalStyles = makeStyles({
  root: ({ isMobile }) => ({
    '&.backdrop': {
      zIndex: '9999',
      position: 'absolute',
      top: '0',
      left: '0',

      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(67, 67, 67, 0.7)',

      '& .modal': {
        zIndex: '1',
        position: 'relative',
        background: '#fff',
        boxShadow: 'var(--drop-shadow)',
        borderRadius: '0.375rem',

        minWidth: 'max-content',
        maxWidth: isMobile ? '95vw' : '80vw',

        height: 'max-content',
        maxHeight: isMobile ? '95vh' : '80vw',

        display: 'grid',
        gridTemplate: `
          'header'
          'content'
          'footer'
        `,
        gridTemplateRows: '50px 1fr auto',

        '& .modal-header': {
          gridArea: 'header',
          padding: '1rem',
        },

        '& .modal-content': {
          gridArea: 'content',
          padding: isMobile ? '1rem' : '1.5rem',
          paddingTop: '0',
          overflowY: 'auto',
        },

        '& .modal-footer': {
          gridArea: 'footer',
          padding: '1rem',
        },
      },
    },
  }),
});

export const StyledCloseBtn = styled(X)({
  '&.close-btn': {
    width: '3rem',
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',

    color: '#343434',
    opacity: '0.6',

    '&:hover': {
      cursor: 'pointer',
      color: 'var(--primary-color)',
      opacity: '1',
    },
  },
});
