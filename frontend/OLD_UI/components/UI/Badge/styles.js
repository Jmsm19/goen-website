import { styled } from '@material-ui/styles';

const StyledBadge = styled('span')({
  '&.badge': {
    color: '#fff',
    padding: '2px 6px',
    borderRadius: '0.375rem',

    '&.primary': {
      background: 'var(--light-obscure-primary-color)',
    },

    '&.success': {
      background: 'var(--success-color)',
    },

    '&.danger': {
      background: 'var(--danger-color)',
    },

    '&.info': {
      background: 'var(--info-color)',
    },

    '&.warning': {
      background: 'var(--warning-color)',
    },
  },
});

export default StyledBadge;
