import posed from 'react-pose';

import { FadeIn, SlideUp } from '../../../animations';

export const FadeInBackdrop = posed.div(
  FadeIn(
    {
      beforeChildren: true,
    },
    {
      delay: 3000,
      afterChildren: true,
    },
  ),
);

export const SlideUpModal = posed.div(SlideUp());

export const FadeInModalContent = posed.div(
  FadeIn({
    beforeChildren: true,
  }),
);
