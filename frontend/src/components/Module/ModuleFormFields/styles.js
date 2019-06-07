import { styled } from '@material-ui/styles';

const StyledFormFields = styled('div')({
  '&.form-fields': {
    minHeight: 90,
    display: 'grid',
    overflow: 'visible',
    gridGap: '1rem',
    gridTemplateColumns: '1fr',

    '& .module-name': {
      display: 'grid',
      gridGap: '1rem',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    },

    '& .instructors': {
      display: 'grid',
      gridGap: '1rem',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 1fr',
    },

    '& .module-schedule, & .instructors': {
      '& .overlay-container': {
        height: '100%',
        width: '100%',

        '& .selector': {
          width: '100%',
          maxWidth: '100%',
        },
      },
    },
  },
});

export default StyledFormFields;
