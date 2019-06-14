import React, { Component } from 'react';
import { Icon } from 'react-materialize';

import CartItem from './CartItem';
import PayPalButton from './PayPalButton';

export function CheckoutCart(props) {
  const {
    shoppingCart,
    clearCart,
    editPizza,
    removeItemFromCart,
    currencyFormatter
  } = props.value;
  const { history, isOnlyDisplay, state } = props;
  let totalAmount = 0;
  let shoppingCartIDs = Object.keys(shoppingCart);

  return(<div className="CheckoutCart">
      <h5 className="shopping_cart_title"><Icon>shopping_cart</Icon>&nbsp;Shopping Cart</h5>
      {shoppingCartIDs.map((id, index) => {
        if(index === 0) totalAmount = 0;
        let item = shoppingCart[id];
        let domItems = item.ingredients.map((igd, i) => <p key={i} className="pizza_igd"><span>{igd.name}</span> +{currencyFormatter().format(igd.price)}$ &nbsp;</p>);
        let pizzaPrice = item.ingredients.reduce((total, igd) => (total + igd.price), 0.00);
        let totalPrice = (item.size == 'Medium' ? 1.2 : (item.size == 'Large' ? 1.3 : 1)) * pizzaPrice;
        totalAmount += Number(currencyFormatter().format(totalPrice));

        return (<CartItem key={index}
          id={id} index={index} item={item}
          domItems={domItems} totalPrice={totalPrice}
          isOnlyDisplay={isOnlyDisplay}
          currencyFormatter={currencyFormatter} editPizza={editPizza}
          removeItemFromCart={removeItemFromCart} >
        </CartItem>);
        }
      )}
      <p className="total_price">Total: {currencyFormatter().format(totalAmount)}$</p>
      {shoppingCartIDs.length != 0 && isOnlyDisplay !== true ?
        <React.Fragment><PayPalButton className="checkout_btn"
                totalAmount={Number(currencyFormatter().format(totalAmount))}
                clearCart={clearCart}
                history={history}
                shoppingCart={shoppingCart}
            /><p style={{'fontSize': 10 + 'px'}}>User: pizzabuyer@gmail.com</p>
            <p style={{'fontSize': 10 + 'px'}}>Password: 12345678</p>
        </React.Fragment>: ''}
    </div>);
}
