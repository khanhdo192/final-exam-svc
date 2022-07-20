import React from 'react';
import CheckoutForm from './CheckoutForm';
import Order from './Order';

const CheckoutPage = () => {
  return (
    <div className="container checkout__container">
      <div className="row">
        <div className="col-lg-6 col-12">
          <CheckoutForm />
        </div>
        <div className="col-lg-6 col-12">
          <Order />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
