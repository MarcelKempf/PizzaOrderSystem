import React from 'react';
import { Link } from 'react-router-dom';
import { CheckoutCart } from './CheckoutCart';

export default function Confirmation(props) {
  const formatter = () => {
    return new Intl.NumberFormat('en-AU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  const { payment, shoppingCart } = props.location.state;
  return(
    <div className="confirmation">
      <h1 className="payment_state">{payment.paid === true ? 'Thank you for your payment': 'Payment unsuccessful!' }</h1>
      {payment.paid === true && shoppingCart.length !== 0 ?
          <CheckoutCart isOnlyDisplay history={props.history} value={{ 'shoppingCart': shoppingCart, 'currencyFormatter': formatter}} />
          : <Link className='link_tryagain' to={'/creator'}>Try again</Link>
        }
    </div>
  );
}
