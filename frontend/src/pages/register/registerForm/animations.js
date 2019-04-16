import posed from 'react-pose';

import PersonalDataSection from './personalDataSection';
import UserDataSection from './userDataSection';
import Button from '../../../components/UI/Button';

import { FadeIn, SlideRight, SlideLeft } from '../../../animations';

// Container
export const FadeInContainer = posed.div(FadeIn({ beforeChildren: true }, { afterChildren: true }));

// Form sections
export const SlideRightPersonalSection = posed(PersonalDataSection)(SlideLeft());
export const SlideLeftUserSection = posed(UserDataSection)(SlideRight());

// Buttons
export const FadeInButtonArea = posed.div(FadeIn({ delay: 300 }));
export const FadeInButton = posed(Button)(FadeIn());
