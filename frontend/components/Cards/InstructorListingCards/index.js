import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { StyledInstructorCard } from '../../../styles/components/InstructorPage';

function InstructorListingCards({ instructors }) {
  return (
    <>
      {instructors.map(instructor => (
        <StyledInstructorCard key={uuid()} hoverable>
          <div className='left'>
            <img
              src={`/static/images/clans/${instructor.clan.toLowerCase()}.png`}
              alt={instructor.clan}
            />
          </div>
          <div className='right'>
            <h4>{instructor.name}</h4>
            <p>{instructor.email}</p>
          </div>
        </StyledInstructorCard>
      ))}
    </>
  );
}

InstructorListingCards.propTypes = {
  instructors: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default InstructorListingCards;
