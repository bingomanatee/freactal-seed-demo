import Bottle from 'bottlejs';
import bigStockAPI from './apis/bigStock';
export default () => {

  const bottle = new Bottle();
  bottle.factory('bigStockAPI', () => bigStockAPI);

  return bottle;
}