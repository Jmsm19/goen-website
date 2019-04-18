import React from 'react';
import PropTypes from 'prop-types';

import routes from '../../../../lib/config/routes';
import NavSection from '../../../Navigation/NavSection';

const StudentRoutes = ({ onLinkClick, t }) => {
  const links = [
    {
      path: routes.dashboard.student.moduleRegister,
      linkText: t('ModuleRegister'),
    },
  ];

  return <NavSection title={t('Student')} routes={links} onLinkClick={onLinkClick} />;
};

StudentRoutes.propTypes = {
  t: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

export default StudentRoutes;
