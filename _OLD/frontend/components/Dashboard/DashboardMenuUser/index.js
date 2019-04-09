import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import {
  StyledMenuUser,
  SiderbarUserMeta,
} from '../../../styles/components/dashboard/DashboardMenuUser';

function DashboardMenuUser({ user }) {
  const { currentModule, clan } = user;
  const clanName = clan ? clan.toLowerCase() : null;

  return (
    <StyledMenuUser>
      <Avatar
        src={clanName && `/static/images/clans/${clanName}.png`}
        size={clanName ? 130 : 64}
        icon='user'
      />
      <SiderbarUserMeta>
        <h3 className='user-name'>{user.name}</h3>
        {currentModule && (
          <p className='user-module'>
            {currentModule.name} - {currentModule.section}
          </p>
        )}
      </SiderbarUserMeta>
    </StyledMenuUser>
  );
}

DashboardMenuUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currentModule: PropTypes.shape({
      name: PropTypes.string,
      section: PropTypes.string,
    }),
  }).isRequired,
};

export default DashboardMenuUser;
