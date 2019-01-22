import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Button } from 'antd';
import PaymentForm from '../PaymentForm';
import BankInfo from '../BankInfo';

class PaymentProcessing extends Component {
  state = {
    imageUploaded: false,
  };

  setImageUploadStatus = status => {
    this.setState({
      imageUploaded: status,
    });
  };

  render() {
    const { imageUploaded } = this.state;
    const { t, setRegistrationStatus } = this.props;
    const { Panel } = Collapse;

    const panelList = [
      {
        key: 'BOD',
        header: 'Banco Occidental de Descuento',
        content: (
          <BankInfo
            t={t}
            accountNumber='0116-0127-80-2127046738'
            name='Shigeki Yamada'
            nationalId='E-1.130.509'
          />
        ),
      },
    ];

    return (
      <div>
        <div className='left'>
          <h3>Bancos</h3>
          <p>El pago es realizado mediante transferencia.</p>
          <div>
            El pago es único por todo el módulo. Este incluye el pago por inscripción y el material
            de apoyo.
          </div>
          <Collapse
            accordion
            defaultActiveKey='BOD'
            style={{ maxWidth: '1024px', margin: '0 auto 30px' }}
          >
            {panelList.map(({ key, header, content }) => (
              <Panel header={header} key={key}>
                {content}
              </Panel>
            ))}
          </Collapse>
        </div>

        <div
          className='right'
          style={{ display: 'grid', justifyContent: 'center', gridAutoColumns: '350px' }}
        >
          <PaymentForm t={t} setImageUploadStatus={this.setImageUploadStatus} />
        </div>
        <Button
          type='primary'
          disabled={!imageUploaded}
          onClick={() => setRegistrationStatus('verifying payment')}
        >
          {t('Next')}
        </Button>
      </div>
    );
  }
}

PaymentProcessing.propTypes = {
  t: PropTypes.func.isRequired,
  setRegistrationStatus: PropTypes.func.isRequired,
};

export default PaymentProcessing;
