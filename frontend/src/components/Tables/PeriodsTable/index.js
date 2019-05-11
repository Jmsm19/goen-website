import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TrashAlt as Trash } from 'styled-icons/fa-solid/TrashAlt';

import Button from '../../UI/Button';

import routes from '../../../lib/config/routes';
import StyledTable from './styles';

const PeriodsTable = ({ periods, deleteCol, onDelete, ...props }) => {
  const { t } = useTranslation();

  const columns = [
    {
      key: 'name',
      text: t('Period.Name'),
      render: (name, period) => (
        <Link to={routes.dashboard.admin.periodDetails(period.id)}>
          {`${t('Period._singular')} ${name}`}
        </Link>
      ),
    },
    {
      key: 'year',
      text: t('Year'),
    },
    {
      key: 'modules',
      text: t('Module.Qty'),
      render: modules => t('Module.Count', { count: modules.length }),
    },
    {
      key: 'active',
      text: t('Period.IsActive'),
      render: active => (
        <span className={active ? 'active-period' : 'closed-period'}>
          {t(`Period.${active ? 'Active' : 'Over'}`)}
        </span>
      ),
    },
  ];

  if (deleteCol) {
    columns.push({
      key: 'delete',
      text: '',
      render: (_, period) => (
        <Button
          outline
          type='primary'
          icon={<Trash size={20} />}
          onClick={() => {
            if (onDelete && typeof onDelete === 'function') {
              onDelete(period.id);
            }
          }}
        />
      ),
    });
  }

  return <StyledTable columns={columns} data={periods} noData={t('Period.NoPeriods')} {...props} />;
};

PeriodsTable.defaultProps = {
  deleteCol: false,
  onDelete: () => null,
};

PeriodsTable.propTypes = {
  periods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  deleteCol: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default PeriodsTable;
