import React from 'react';
import PropTypes from 'prop-types';

import routes from '../../../../lib/config/routes';
import NavSection from '../../../Navigation/NavSection';

const InstructorRoutes = ({ onLinkClick, t }) => {
  const links = [
    {
      path: routes.dashboard.instructor.home,
      linkText: t('Module._plural'),
    },
  ];

  return <NavSection title={t('Instructor._singular')} routes={links} onLinkClick={onLinkClick} />;
};

InstructorRoutes.propTypes = {
  t: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

export default InstructorRoutes;
