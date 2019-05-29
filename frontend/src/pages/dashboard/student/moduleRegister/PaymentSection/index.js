import React from 'react';
// import PropTypes from 'prop-types';

import Accordion from '../../../../../components/UI/Accordion';

const PaymentSection = () => (
  <div className='payment-section'>
    <h1>Payment</h1>
    <section>
      <h2>Instructions</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur ab quia temporibus.
        Obcaecati officiis aut distinctio molestias ipsa excepturi tempore quibusdam iste itaque
        temporibus dolor asperiores ipsam animi, illum eaque!
      </p>
    </section>

    <section className='available-payments' style={{ maxWidth: '500px' }}>
      <h2>Available banks</h2>
      <Accordion title='Banesco' titleTag='h3' isOpen>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus perferendis ab
          mollitia obcaecati quas nesciunt officia, nam iusto aspernatur deserunt consequatur,
          voluptas sequi deleniti atque ipsam doloribus incidunt harum est.
        </p>
      </Accordion>
      <Accordion title='BOD' titleTag='h3' isOpen>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus perferendis ab
          mollitia obcaecati quas nesciunt officia, nam iusto aspernatur deserunt consequatur,
          voluptas sequi deleniti atque ipsam doloribus incidunt harum est.
        </p>
      </Accordion>
    </section>
  </div>
);

PaymentSection.defaultProps = {};

PaymentSection.propTypes = {};

export default PaymentSection;
