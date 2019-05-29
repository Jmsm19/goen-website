import posed from 'react-pose';

import { FadeIn } from '../../../animations';
import { FadeInButton as FIB } from '../../../animations/components';

// Container
export const FadeInContainer = posed.div(FadeIn({ beforeChildren: true }, { afterChildren: true }));

// Buttons
export const FadeInButtonArea = posed.div(FadeIn({ delay: 300 }));
export const FadeInButton = FIB;
