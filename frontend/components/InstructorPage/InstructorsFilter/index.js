import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Loading from '../../SiteGeneral/Loading';
import InstructorListingCards from '../../Cards/InstructorListingCards';
import { StyledButtonCard } from '../../../styles/components/InstructorPage';

function InstructorsFilter({ t, loading, instructors }) {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <StyledButtonCard type='dashed'>
        <Icon type='user-add' />
        {t('AddInstructor')}
      </StyledButtonCard>

      <InstructorListingCards loading={loading} instructors={instructors} />
    </>
  );
}

InstructorsFilter.defaultProps = {
  instructors: [],
};

InstructorsFilter.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  instructors: PropTypes.arrayOf(PropTypes.shape()),
};

export default InstructorsFilter;
