/* eslint-disable import/prefer-default-export */
import posed from 'react-pose';

// Components
import Card from '../components/UI/Card';

// Animations
import { SlideUp } from './index';

// Animated Components
export const SlideUpCard = posed(Card)(
  SlideUp({
    delay: 300,
    beforeChildren: true,
  }),
);
