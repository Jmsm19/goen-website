import posed from 'react-pose';

import { FadeIn } from '../../../animations';

export const FadeInTable = posed.table(
  FadeIn(
    {
      beforeChildren: true,
      staggerChildren: 60,
    },
    {
      afterChildren: true,
      staggerChildren: 60,
    },
  ),
);

export const FadeInLoadingOverlay = posed.div(
  FadeIn(
    {
      transition: 'ease',
    },
    { transition: 'ease' },
  ),
);

export const FadeInTableRow = posed.tr(FadeIn());
