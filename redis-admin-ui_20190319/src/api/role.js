import axios from 'axios';

//let base = 'http://localhost:8080';
let base = location.protocol + '//' + location.hostname + ':8080';
let tag = 'auth/role'; // item name

export default {
  getItem: params => {
    return axios.get(`${base}/${tag}/get`, {
        params: params
      })
      .then(res => {
        console.log('axios role.js get res', res);
        console.log('axios rolejs get res.data', res.data);
        return res.data
      });
  },
  getItemList: params => {
    return axios.get(`${base}/${tag}/list`, {
        params: params
      })
      .then(res => {
        console.log('axios role.js list res', res);
        console.log('axios rolejs list res.data', res.data);
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
  },

  //role methods
  deleteMenu: params => {
    return axios.get(`${base}/${tag}/deleteMenu`, {
      params: params
    });
  },
  addMenu: params => {
    return axios.get(`${base}/${tag}/addMenu`, {
      params: params
    });
  }
}
