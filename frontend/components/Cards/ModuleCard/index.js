import React from 'react';
import PropTypes from 'prop-types';
import { Card, Tag } from 'antd';
import StyledModuleCard from '../../../styles/components/ModuleCard';
import { formatHoursFromDB, formatPrice } from '../../../utils';

function ModuleCard({ module, lng, canRegister, toggleConfirmPopFor, t }) {
  const { name, section, price, schedule, clan, availableSpaces, id } = module;
  const clanName = clan ? clan.toLowerCase() : null;
  const day = t(`Day${new Date(schedule.startDate).getDay()}`);
  const fromTime = formatHoursFromDB(schedule.from);
  const untilTime = formatHoursFromDB(schedule.until);
  const formatedPrice = formatPrice(price, lng);

  return (
    <StyledModuleCard
      canRegister={canRegister}
      title={`${name} ${section}`}
      extra={
        canRegister ? (
          `${t('AvailableSpaces')}: ${availableSpaces}`
        ) : (
          <Tag color='red' style={{ textTransform: 'uppercase' }}>
            {t('CannotRegister')}
          </Tag>
        )
      }
      hoverable={canRegister}
      onClick={() => (canRegister ? toggleConfirmPopFor(id) : null)}
    >
      <Card.Meta
        title={formatedPrice}
        description={
          <div>
            <span>{day}</span>
            <br />
            <span>
              {fromTime} - {untilTime}
            </span>
          </div>
        }
        avatar={
          clanName && (
            <img
              style={{ width: '90px' }}
              src={`/static/images/clans/${clanName}.png`}
              alt={clanName}
            />
          )
        }
      />
    </StyledModuleCard>
  );
}

ModuleCard.propTypes = {
  module: PropTypes.shape().isRequired,
  lng: PropTypes.string.isRequired,
  canRegister: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  toggleConfirmPopFor: PropTypes.func.isRequired,
};

export default ModuleCard;
