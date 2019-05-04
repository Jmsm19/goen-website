import React from 'react';
import PropTypes from 'prop-types';

import routes from '../../../../lib/config/routes';
import NavSection from '../../../Navigation/NavSection';

const AdminRoutes = ({ onLinkClick, t }) => {
  const links = [
    {
      path: routes.dashboard.admin.home,
      linkText: t('Period._singular'),
    },
    {
      path: routes.dashboard.admin.modules,
      linkText: t('Module._plural'),
    },
  ];

  return <NavSection title={t('Admin')} routes={links} onLinkClick={onLinkClick} />;
};

AdminRoutes.propTypes = {
  t: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

export default AdminRoutes;
