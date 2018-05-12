import {withRouter} from 'react-router-dom';
import {Component} from 'react';
import {injectState} from './lib/state';
import style from './Cart.module.css';
import CartItem from './CartItem.jsx';

function isAbout() {
  return  /about/.test(location.hash);
}
export default injectState(withRouter(({state, effects, match}) =>  (
  isAbout() ? '' :   <div className={style.Cart}>
      <h3>Shopping Cart</h3>
      <div className={style.Cart__items}>
        {(state.cart && state.cart.length) ? state.cart.map((item, index) =>(<CartItem key={`${index}_${item.id}`} item={item}/>)) : '-- empty--'}
      </div>
    </div>)));