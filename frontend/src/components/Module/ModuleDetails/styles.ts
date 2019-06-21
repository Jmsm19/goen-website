import { styled } from '@material-ui/styles';

const StyledContainer = styled('div')({
  '& section': {
    display: 'grid',

    '&:not(:last-child)': {
      marginBottom: '2rem',
    },

    '& h2': {
      fontSize: '1rem',
    },

    '&.module-summary-section': {
      '& .animation-wrapper': {
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
    },

    '&.senpai-section': {
      '& .animation-wrapper': {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        alignItems: 'center',

        '& .senpai-section-title': {
          marginBottom: '0.5rem',
        },
      },
    },

    '&.students-section': {},
  },
});

export default StyledContainer;
