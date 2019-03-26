import axios from 'axios';

//let base = '';
//let base = 'http://localhost:8080';
let base = location.protocol + '//' + location.hostname + ':8080';
let tag = 'auth/operate'; // item name

export default {
  getItemListPage: params => {
    return axios.get(`${base}/${tag}/listpage`, {
      params: params
    }).then(res => {
      console.log('getItemList paging res', res);
      console.log('getItemList paging res.data', res.data);
      return res.data
    });
  }
}
