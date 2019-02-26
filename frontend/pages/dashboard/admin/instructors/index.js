import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Icon, notification } from 'antd';
import withInstructorsContext from '../../../../components/HOCs/withInstructorsContext';
import { filterArrayByName } from '../../../../utils';
import InstructorsFilter from '../../../../components/InstructorPage/InstructorsFilter';
import SignUpForm from '../../../../components/Forms/SignUpForm';
import { withNamespaces } from '../../../../i18n';
import { AuthContextConsumer } from '../../../../context/AuthContext';
import { UsersContextConsumer } from '../../../../context/UsersContext';
import UsersTable from '../../../../components/Tables/UsersTable';
import {
  StyledSearchInput,
  StyledPage,
  InstructorsArea,
  StyledModalContent,
  StyledButtonCard,
} from '../../../../styles/components/InstructorPage';
import RequireRole from '../../../../components/RequireRole';

class InstructorsManagementPage extends Component {
  state = {
    filteredInstructors: null,
    modalVisible: false,
    modalView: '',
  };

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  componentDidMount() {
    const {
      instructorContext: { instructors, getAllInstructors },
    } = this.props;
    if (!instructors.length) {
      getAllInstructors();
    }
  }

  // TODO: Move function to InstructorsFilter component
  handleInstructorFilter = name => {
    const {
      instructorContext: { instructors },
    } = this.props;

    this.setState({
      filteredInstructors: filterArrayByName(instructors, name),
    });
  };

  toggleModal = (callback, defaultView = 'SelectAction') => {
    this.setState(
      prevState => ({
        // When opening show 'SelectAction', else keep previous view
        modalView: !prevState.modalVisible ? defaultView : prevState.modalView,
        modalVisible: !prevState.modalVisible,
      }),
      () => (typeof callback === 'function' ? callback() : null),
    );
  };

  render() {
    const { filteredInstructors, modalVisible, modalView } = this.state;
    const {
      t,
      instructorContext: { getAllInstructors, instructors, loading, addRole, removeRole },
    } = this.props;

    const modalContent = {
      CreateFromUser: (
        <UsersContextConsumer>
          {({ users, gettingUsers, getAllUsers }) => (
            <UsersTable
              showRoles={false}
              t={t}
              loading={gettingUsers}
              addRole={id => addRole(id, this.toggleModal)}
              users={users.filter(user => !user.isInstructor)}
              getUsers={getAllUsers}
            />
          )}
        </UsersContextConsumer>
      ),
      CreateNewUser: (
        <StyledModalContent>
          <AuthContextConsumer>
            {({ handleRegister, fieldErrors, registerSuccess, resetRegistrationSuccess }) =>
              registerSuccess ? (
                resetRegistrationSuccess(() => {
                  this.toggleModal();
                  getAllInstructors();
                  notification.success({
                    message: t('InstructorRegistered'),
                  });
                })
              ) : (
                <SignUpForm
                  t={t}
                  showRoleSelector
                  defaultRole='instructor'
                  fieldErrors={fieldErrors}
                  handleRegister={handleRegister}
                />
              )
            }
          </AuthContextConsumer>
        </StyledModalContent>
      ),
    };

    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <StyledPage>
            <div className='button-area'>
              <StyledButtonCard
                type='dashed'
                title={t('AddInstructor')}
                onClick={() => this.toggleModal(null, 'CreateNewUser')}
              >
                <Icon type='user-add' />
                {t('AddInstructor')}
              </StyledButtonCard>

              <StyledButtonCard
                type='dashed'
                title={t('AddInstructorFromExistingUser')}
                onClick={() => this.toggleModal(null, 'CreateFromUser')}
              >
                <Icon type='user-add' />
                {t('AddInstructorFromExistingUser')}
              </StyledButtonCard>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gridGap: 10 }}>
              <StyledSearchInput
                autoFocus
                placeholder={t('InstructorName')}
                onChange={({ target }) => this.handleInstructorFilter(target.value)}
              />
              <Button style={{ height: '100%' }} onClick={() => getAllInstructors()}>
                <Icon type='redo' spin={loading} />
              </Button>
            </div>

            <InstructorsArea className='instructors' loading={loading}>
              <InstructorsFilter
                t={t}
                loading={loading}
                instructors={filteredInstructors || instructors}
                onUserCardClick={id => removeRole(id, 'instructor')}
              />

              <Modal
                style={{ minWidth: 400 }}
                visible={modalVisible}
                footer={false}
                onCancel={this.toggleModal}
                bodyStyle={{ maxHeight: '80vh', overflowY: 'auto', top: 20, padding: 0 }}
              >
                {modalContent[modalView]}
              </Modal>
            </InstructorsArea>
          </StyledPage>
        )}
      </RequireRole>
    );
  }
}

InstructorsManagementPage.propTypes = {
  t: PropTypes.func.isRequired,
  instructorContext: PropTypes.shape({
    instructors: PropTypes.arrayOf(PropTypes.shape).isRequired,
    getAllInstructors: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNamespaces('common')(withInstructorsContext(InstructorsManagementPage));
