import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { getClanImageAddress, formatHoursFromDB } from '../../../lib/utils';
import StyledTable from './styles';

const ModulesTable = ({ modules, ...props }) => {
  const { t } = useTranslation();

  const columns = [
    {
      key: 'clan',
      text: t('Clan'),
      render: clan =>
        clan ? <img src={getClanImageAddress(clan.name)} alt={clan.name} width={50} /> : '-',
    },
    {
      key: 'fullName',
      text: t('Module._singular'),
    },
    {
      key: 'period',
      text: t('Period._singular'),
      render: period => (period ? `${period.name} - ${period.year}` : '-'),
    },
    {
      key: 'schedule',
      text: t('Schedule._singular'),
      render: schedule => `${t(schedule.day)} - ${formatHoursFromDB(schedule.from)}`,
    },
  ];

  return <StyledTable columns={columns} data={modules} noData={t('Module.NoModules')} {...props} />;
};

ModulesTable.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default ModulesTable;
