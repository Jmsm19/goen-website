import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import NavSection from '../../NavSection';

import routes from '../../../../lib/config/routes';

const AdminRoutes: React.FC<RouteSectionProps> = ({ onLinkClick }) => {
  const { t } = useTranslation();

  const links = [
    {
      path: routes.dashboard.admin.home,
      linkText: t('Period.Summary'),
    },
    {
      path: routes.dashboard.admin.managePeriods,
      linkText: t('Period.Manage'),
    },
    {
      path: routes.dashboard.admin.modules,
      linkText: t('Module._plural'),
    },
    {
      path: routes.dashboard.admin.users,
      linkText: t('User._plural'),
    },
  ];

  return <NavSection title={t('Admin')} routes={links} onLinkClick={onLinkClick} />;
};

AdminRoutes.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};

export default AdminRoutes;
