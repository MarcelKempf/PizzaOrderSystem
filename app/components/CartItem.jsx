import React from 'react';
import { Icon, Button } from 'react-materialize';

export default function CartItem(props) {

  const { id, item, index, isOnlyDisplay, totalPrice, domItems, currencyFormatter, editPizza, removeItemFromCart } = props;

  return (<div key={index}  className="cart_item">
            <h6>PIZZA
              <span className="pizza_size">{item.size}&nbsp;&nbsp;
                <span className="pizza_extraprice">{item.size == 'Medium' ? '+ 20%' : (item.size == 'Large' ? '+ 30%': '')}</span>
              </span>
              <span className="pizza_price">{currencyFormatter().format(totalPrice)}$</span>
            </h6>
            <div className="pizza_ingredients">{domItems}</div>
            {isOnlyDisplay !== true ? <span className="item_actions">
              <Button className="edit_item" type="submit" onClick={editPizza.bind(this, id, item)} waves="light"><Icon tiny>edit</Icon></Button>
              <Button className="delete_item" type="submit" onClick={removeItemFromCart.bind(this, id)} waves="light"><Icon tiny>delete_forever</Icon></Button>
            </span>: ''}
        </div>);

}
