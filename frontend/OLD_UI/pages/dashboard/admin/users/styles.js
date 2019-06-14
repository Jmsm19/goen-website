import { styled } from '@material-ui/styles';

const StyledPage = styled('div')({
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridGap: '1rem',

  '& section': {
    display: 'grid',
    alignItems: 'flex-start',
  },

  '& .table-wrapper': {
    height: '100%',
    maxHeight: '73vh',
  },

  '& .users-section': {
    gridTemplateRows: 'auto 1fr',
    gridGap: '1rem',

    '& .users-search-area': {
      display: 'flex',
      justifyItems: 'space-between',

      '& input': {
        marginRight: '10px',

        '& + .btn': {
          fontSize: '0.8rem',
          padding: '0.625rem',
        },
      },
    },
  },
});

export default StyledPage;
