/* eslint-disable import/prefer-default-export */
import posed from 'react-pose';

// Components
import Card from '../components/UI/Card';

// Animations
import { SlideUp, FadeIn } from './index';

// Animated Components
export const SlideUpCard = posed(Card)(
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
