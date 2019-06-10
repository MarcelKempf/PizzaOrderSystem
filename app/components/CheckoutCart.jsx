import React, { Component } from 'react';
import { Icon, Button } from 'react-materialize';

export class CheckoutCart extends Component {
  constructor(props){
    super(props);

  }

  //Format double into valid currency format
  formatter() {
    return new Intl.NumberFormat('en-AU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  })}

  render() {
    let shoppingCartIDs = Object.keys(this.props.shoppingCart);
    return(
      <div className="CheckoutCart">
        <Icon className="shopping_cart_title">shopping_cart<h5>&nbsp;Shopping Cart</h5></Icon>
        {shoppingCartIDs.map((id, index) => {
          let item = this.props.shoppingCart[id];
          let domItems = item.ingredients.map((igd, i) => <p key={i} className="pizza_igd"><span>{igd.name}</span> +{this.formatter().format(igd.price)}$ &nbsp;</p>);
          console.log(item);
          return (<div key={index}  className="cart_item"><h6>PIZZA<span className="pizza_size">{item.size}&nbsp;&nbsp;<span className="pizza_extraprice">{item.size == 'Medium' ? '+ 20%' : (item.size == 'Large' ? '+ 30%': '')}</span></span><span className="pizza_price">{this.formatter().format((item.size == 'Medium' ? 1.2 : (item.size == 'Large' ? 1.3 : 1)) * item.ingredients.reduce(((total, igd) => total + igd.price), 0.00))}$</span></h6><div className="pizza_ingredients">{domItems}</div></div>);
          }
        )}
        {shoppingCartIDs.length != 0 ? <Button className="checkout_btn" type="submit" waves="light">
          Checkout
          <Icon right>
            credit_card
          </Icon>
        </Button>: ''}
      </div>
    )
  }

}
