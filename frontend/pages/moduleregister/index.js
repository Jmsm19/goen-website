import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Skeleton, notification, Modal, Steps, Icon, Card } from 'antd';
import { GetData } from '../../utils/fetch';
import { withNamespaces } from '../../i18n';
import {
  StyledPage,
  StyledModuleCard,
  StyledSteps,
  StyledPageContent,
  StyledModulesGrid,
} from '../../styles/pages/ModuleRegisterPage';

class ModuleRegisterPage extends Component {
  state = {
    mounted: false,
    periodData: {},
    currentStep: 0,
  };

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  componentDidMount() {
    GetData('/period/current')
      .then(response => response.json())
      .then(({ data, error }) => {
        if (error) throw Error(error);
        this.setState({
          mounted: true,
          periodData: data,
        });
      })
      .catch(error => {
        notification.error({
          message: error.message || error.error,
        });
      });
  }

  nextStep = () => {
    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1,
    }));
  };

  toggleConfirmPopFor = moduleId => {
    const { t } = this.props;
    const { nextStep } = this;

    Modal.confirm({
      title: t('ModuleRegisterConfirm'),
      width: 'max-content',
      okText: t('Yes'),
      okType: 'primary',
      centered: true,
      cancelText: t('No'),
      onOk() {
        nextStep();
        console.log('Register in module with Id: ', moduleId);
      },
    });
  };

  render() {
    const { t } = this.props;
    const { mounted, periodData, currentStep } = this.state;
    const { modules } = periodData;
    const periodName = `${periodData.name} - ${periodData.year}`;

    return (
      <StyledPage>
        <StyledSteps direction='horizontal' current={currentStep}>
          <Steps.Step title='Inscripción' icon={<Icon type='user' />} />
          <Steps.Step title='Pago' icon={<Icon type='credit-card' />} />
          <Steps.Step title='Listo' icon={<Icon type='smile-o' />} />
        </StyledSteps>

        {currentStep === 0 && (
          <Skeleton loading={!mounted} active>
            <StyledPageContent>
              <h1>{t('AvailableModulesForPeriod', { period: periodName })}</h1>
              <h2>{t('ChooseModule')}</h2>
              <StyledModulesGrid>
                {modules &&
                  modules.map(({ name, id }) => (
                    <StyledModuleCard
                      title={name}
                      extra={t('AvailableSpaces')}
                      key={uuid()}
                      hoverable
                      onClick={() => {
                        this.toggleConfirmPopFor(id);
                      }}
                    >
                      <Card.Meta
                        title={t('Price')}
                        description={`${t('Day')} ${t('TimeFrom')}-${t('TimeUntil')}`}
                        avatar={
                          <img
                            style={{ width: '90px' }}
                            src='/static/images/clans/kani.png'
                            alt='Kani'
                          />
                        }
                      />
                    </StyledModuleCard>
                  ))}
              </StyledModulesGrid>
            </StyledPageContent>
          </Skeleton>
        )}

        {currentStep === 1 && <h2>Process Payment</h2>}

        {currentStep === 2 && <h2>You are registered</h2>}
      </StyledPage>
    );
  }
}

ModuleRegisterPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(ModuleRegisterPage);
export const CleanModuleRegisterPage = ModuleRegisterPage;
