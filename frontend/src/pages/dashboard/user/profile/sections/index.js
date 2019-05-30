import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'shards-react';

import { useLayout } from '../../../../../store/context/LayoutContext';

import InstructorsSection from './InstructorsSection';
import AssistantSection from './AssistantSection';

import { capitalize } from '../../../../../lib/utils';

import { StyledRoleSections } from '../styles';

const SectionSelector = ({ t, user }) => {
  const { isMobile } = useLayout();

  const setDefaultView = () => {
    if (user.isStudent) return 'student';
    if (user.isInstructor) return 'instructor';
    if (user.isAssistant) return 'assistant';
    return 'student';
  };
  const [view, setView] = useState(setDefaultView());

  const renderButton = role => (
    <Button
      outline
      size={isMobile ? 'sm' : 'normal'}
      active={view === role}
      onClick={() => setView(role)}
    >
      {t(`${capitalize(role)}._singular`)}
    </Button>
  );

  return (
    <StyledRoleSections className='role-sections'>
      <div className='section-selector-area'>
        <ButtonGroup className='section-selector'>
          {/* Select student view */}
          {user.isStudent && renderButton('student')}
          {/* Select instructor view */}
          {user.isInstructor && renderButton('instructor')}
          {/* Select assistant view */}
          {user.isAssistant && renderButton('assistant')}
        </ButtonGroup>
      </div>

      {view === 'student' && user.isStudent && <h3>Student section</h3>}
      {view === 'instructor' && user.isInstructor && <InstructorsSection t={t} instructor={user} />}
      {view === 'assistant' && user.isAssistant && <AssistantSection t={t} assistant={user} />}
    </StyledRoleSections>
  );
};

SectionSelector.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

export default SectionSelector;
