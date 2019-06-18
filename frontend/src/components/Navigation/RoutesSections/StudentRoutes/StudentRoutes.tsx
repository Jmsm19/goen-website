import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import NavSection from '../../NavSection';

import routes from '../../../../lib/config/routes';

const StudentRoutes: React.FC<RouteSectionProps> = ({ onLinkClick }) => {
  const { t } = useTranslation();

  const links = [
    {
      path: routes.dashboard.student.moduleRegister,
      linkText: t('ModuleRegister'),
    },
  ];

  return <NavSection title={t('Student._singular')} routes={links} onLinkClick={onLinkClick} />;
};

StudentRoutes.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};

export default StudentRoutes;
