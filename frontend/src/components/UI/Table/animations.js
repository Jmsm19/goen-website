import posed from 'react-pose';

import { FadeIn } from '../../../animations';

export const FadeInTable = posed.table(
  FadeIn(
    {
      beforeChildren: true,
      staggerChildren: 300,
    },
    {
      afterChildren: true,
      staggerChildren: 300,
    },
  ),
);

export const SlideInTableRow = posed.tr(FadeIn());