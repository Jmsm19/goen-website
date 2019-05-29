import posed from 'react-pose';

import ButtonWithRef from '../forwardRefComponents/ButtonWithRef';
import CardWithRef from '../forwardRefComponents/CardWithRef';

// Animations
import { SlideUp, FadeIn } from './index';

// Animated Components
export const SlideUpCard = posed(CardWithRef)(
  SlideUp({
    delay: 300,
    beforeChildren: true,
  }),
);

export const FadeInRouteContainer = posed.div(
  FadeIn(
    {
      height: '100%',
      delay: 300,
      transition: 'ease',
      beforeChildren: true,
    },
    {
      height: '100%',
      delay: 0,
      transition: {
        duration: 0,
      },
    },
  ),
);

export const FadeInSection = posed.section(FadeIn());
export const FadeInButton = posed(ButtonWithRef)(FadeIn());
