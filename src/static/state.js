import {bottle} from 'freactal-seed';
import SeedFactory from 'freactal-seed';
import init from './init';
const myBottle = init();

const {getWrapper, injectState, update} = bottle.container;

let nextCartId = 0;
const getCartId = (item) => `${++nextCartId}__${item.id}`;

const Seed = SeedFactory();
const mySeed = new Seed({}, true);
mySeed.addObjectAndSetEffect('user', {username: 'Dave', email: 'dave@dave.com'});
mySeed.addArrayPropAndSetEffects('images');
mySeed.addArrayPropAndSetEffects('cart');
mySeed.addObjectAndSetEffect('image');
mySeed.addSideEffect('loadImages', (effects) => {
  myBottle.container.bigStockAPI.search('fractal')
             .then((results) => {
               console.log('loaded ', results);
               effects.setImages(results);
             })
             .catch((err) => console.log('error: ', err));
});

mySeed.addSideEffect('loadImage', (effects, id) => {
  myBottle.container.bigStockAPI.get(id)
             .then((data) => effects.setImage(data));
});

mySeed.addEffect('addImageToCart', (effects) => (state) => {
  if (state.image) {
    effects.pushToCart({item: state.image, quantity: 1, cart_id: getCartId(state.image)})
           .then(effects.setImage(null));
  } else {
    effects.setImage(null);
  }
  return state;
});

mySeed.addEffect('removeItemFromCart', (effect, cartId) => (state) => {
  if (!state.cart) return state;
  let newCart = state.cart.reduce((items, item) => {
    if (item.cart_id !== cartId) items.push(item);
    return items;
  }, []);

  return Object.assign({}, state, {cart: newCart});
});

mySeed.addSideEffect('moreCartItem', (effects, cartId) => {
  effects.mapCart((item)=> {
    if(item.cart_id === cartId) {
      ++item.quantity;
    }
    // should really clone for immutability
    return item;
  });
});
mySeed.addSideEffect('lessCartItem', (effects, cartId) => {
  effects.mapCart((item)=> {
    if(item.cart_id === cartId) {
      --item.quantity;
      if (item.quantity < 1) Promise.resolve().then(() => effects.removeItemFromCart(cartId));
    }
    // should really clone for immutability
    return item;
  });
});

const wrapComponentWithState = getWrapper(mySeed.toHash());
export {injectState, update, wrapComponentWithState};