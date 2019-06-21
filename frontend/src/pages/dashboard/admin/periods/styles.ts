import { makeStyles } from '@material-ui/styles';

const usePeriodPageStyles = makeStyles({
  root: ({ isMobile }: { isMobile: boolean }) => ({
    '&.periods-page': {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr',

      '& h1': {
        marginBottom: '1.5rem',
      },

      '& section': {
        display: 'grid',

        '& .period-search-area': {
          marginBottom: '1rem',
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: `repeat(
            auto-fit,
            minmax(260px, ${isMobile ? '1fr' : 'max-content'})
          )`,
          gridTemplateRows: '1fr',
          justifyContent: isMobile ? 'center' : 'space-between',
          alignItems: 'center',

          '& .period-filter': {
            display: 'grid',
            gridGap: '1rem',
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',

            '& .selector': {
              maxWidth: isMobile ? '100%' : undefined,
            },
          },
        },
      },
    },
  }),
});

export default usePeriodPageStyles;
