import style from './Cart.module.css';
import {injectState} from './lib/state';

export default injectState(function ({item, effects}) {
  return (
    <div className={style.Cart__item}>
      <h4 className={style['Cart__item-head']}><span className={style['Cart__item-id']}>{item && item.item && item.item.id ? item.item.id : '--'}:</span>
        <span className={style['Cart__item-quantity']}> ({item && item.quantity ? item.quantity : 0})</span>
      </h4>
      <p className={style['Cart__item-label']}>{item && item.item && item.item.title ? item.item.title : '(untitled)'}</p>
      <div className={style['Cart__item-button-bar']}>
        <button onClick={() => effects.removeItemFromCart(item.cart_id)}>&times; Remove</button>
        <button onClick={() => effects.moreCartItem(item.cart_id)}>+ more</button>
        <button onClick={() => effects.lessCartItem(item.cart_id)}>- less</button>
      </div>
    </div>
  )
})