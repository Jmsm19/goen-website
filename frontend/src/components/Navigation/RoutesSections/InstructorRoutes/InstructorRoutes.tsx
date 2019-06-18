import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import NavSection from '../../NavSection';

import routes from '../../../../lib/config/routes';

const InstructorRoutes: React.FC<RouteSectionProps> = ({ onLinkClick }) => {
  const { t } = useTranslation();

  const links = [
    {
      path: routes.dashboard.instructor.home,
      linkText: t('Module._plural'),
    },
  ];

  return <NavSection title={t('Instructor._singular')} routes={links} onLinkClick={onLinkClick} />;
};

InstructorRoutes.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};

export default InstructorRoutes;
