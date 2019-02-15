import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Icon } from 'antd';
import { StyledInstructorCard } from '../../../styles/components/InstructorPage';

function InstructorListingCards({ t, instructors, onCardClick }) {
  return (
    <>
      {instructors.map(instructor => (
        <StyledInstructorCard key={uuid()} hoverable>
          <div className='left'>
            {instructor.clan ? (
              <img
                src={`/static/images/clans/${instructor.clan.toLowerCase()}.png`}
                alt={instructor.clan}
              />
            ) : (
              <img
                className='GOEN'
                src='/static/images/goen-logo-small.jpg'
                alt={instructor.name}
              />
            )}
          </div>
          <div className='right'>
            <h4 title={instructor.name}>{instructor.name}</h4>
            <p title={instructor.email}>{instructor.email}</p>
          </div>

          <button
            title={t('RemoveAsInstructor')}
            type='button'
            onClick={() => onCardClick(instructor.id)}
          >
            <Icon type='delete' />
          </button>
        </StyledInstructorCard>
      ))}
    </>
  );
}

InstructorListingCards.defaultProps = {
  onCardClick: () => null,
};

InstructorListingCards.propTypes = {
  t: PropTypes.func.isRequired,
  instructors: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onCardClick: PropTypes.func,
};

export default InstructorListingCards;
