// var Bigstock = require('bigstock-node-client');
// var bs = new Bigstock({
//   'key': '537213',
//   'secret': 'f743aa6317c5c9f284096fae4fa980791324120b',
//   // 'hostname': 'https://apitest.bigstockphoto.com/'
// });
import fetchJsonp from 'fetch-jsonp';

const KEY = 537213;

const API = {
  search: (term)=> fetchJsonp(`https://api.bigstockphoto.com/2/${KEY}/search?q=${term}`)
    .then((response) => response.json())
    .then((parsed)=> {
      return parsed.data.images;
    }),
  get: (id) => fetchJsonp(`https://api.bigstockphoto.com/2/${KEY}/image/${id}`)
    .then((response) => response.json())
    .then(({data}) => data.image)
}

export default API;
