import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../../SiteGeneral/Loading';
import InstructorListingCards from '../../Cards/InstructorListingCards';

function InstructorsFilter({ t, loading, instructors, onUserCardClick }) {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <InstructorListingCards
        t={t}
        loading={loading}
        instructors={instructors}
        onCardClick={onUserCardClick}
      />
    </>
  );
}

InstructorsFilter.defaultProps = {
  instructors: [],
  onUserCardClick: () => null,
};

InstructorsFilter.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  instructors: PropTypes.arrayOf(PropTypes.shape()),
  onUserCardClick: PropTypes.func,
};

export default InstructorsFilter;
