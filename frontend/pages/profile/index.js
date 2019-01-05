import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { withNamespaces } from '../../i18n';
import RequireAuthentication from '../../components/RequireAuthentication';
import UserProfile from '../../components/UserProfile';
import UserProfileEditionForm from '../../components/UserProfileEditionForm';
import StyledPage from '../../styles/pages/ProfilePage';

export class ProfilePage extends Component {
  state = {
    isEditing: false
  }

  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  toggleEdition = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }))
  }

  render() {
    const { isEditing } = this.state;
    const { t, isAuth } = this.props;

    return (
      <RequireAuthentication t={t} isAuth={isAuth}>
        {({ authUser, handleUserUpdate, fieldErrors }) => (
          /* Prop removed by styled-components */
          <StyledPage isEditing={isEditing}>
            {!isEditing ? (
              <UserProfile t={t} user={authUser} toggleEdition={this.toggleEdition} />
            ) : (
              <>
                <Avatar
                  alt={authUser.clan || 'user profile'}
                  title={authUser.clan || 'user'}
                  shape={authUser.clan ? 'square' : 'circle'}
                  src={authUser.clan && `/static/images/clans/${authUser.clan.toLowerCase()}.png`}
                  size={200}
                  icon="user" />
                <UserProfileEditionForm t={t} user={authUser}
                  toggleEdition={this.toggleEdition}
                  updateUser={handleUserUpdate}
                  fieldErrors={fieldErrors} />
              </>
            )}
          </StyledPage>
        )}
      </RequireAuthentication>
    )
  }
}

ProfilePage.propTypes = {
  t: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
}

export default withNamespaces('common')(ProfilePage);