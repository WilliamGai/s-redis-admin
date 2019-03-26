import axios from 'axios';

//let base = 'http://localhost:8080';
let base = location.protocol + '//' + location.hostname + ':8080';
let tag = 'auth/menu';// item name

export default {
    getItemList: params => {
      return axios.get(`${base}/${tag}/list`, {
          params: params
        })
        .then(res => {
          console.log('axios menu getItemList res', res);
          console.log('axios menu getItemList res.data', res.data);
          return res.data
        });
    },

    getItemListPage: params => {
      return axios.get(`${base}/${tag}/listpage`, {
        params: params
      }).then(res => {
        console.log('axios menu getItemListPage res', res);
        console.log('axios menu getItemListPage res.data', res.data);
        return res.data
      });
    },

    removeItem: params => {
      return axios.get(`${base}/${tag}/delete`, {
        params: params
      });
    },

    editItem: params => {
      return axios.get(`${base}/${tag}/add`, {
        params: params
      });
    },

    addItem: params => {
      return axios.get(`${base}/${tag}/add`, {
        params: params
      });
    }
}