import axios from 'axios';

//let base = '';
//let base = 'http://localhost:8080';
let base = location.protocol + '//' + location.hostname + ':8080';
let tag = 'auth/user'; // item name

export default {

  getItem: params => {
    return axios.get(`${base}/${tag}/get`, {
      params: params
    });
  },

  getItemList: params => {
    return axios.get(`${base}/${tag}/list`, {
        params: params
      })
      .then(res => {
        console.log('getItemList res', res);
        console.log('getItemList res.data', res.data);
        return res.data
      });
  },

  getItemListPage: params => {
    return axios.get(`${base}/${tag}/listpage`, {
      params: params
    }).then(res => {
      console.log('getItemList paging res', res);
      console.log('getItemList paging res.data', res.data);
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

  //user methods
  deleteRole: params => {
    return axios.get(`${base}/${tag}/deleteRole`, {
      params: params
    });
  },
  addRole: params => {
    return axios.get(`${base}/${tag}/addRole`, {
      params: params
    });
  },

  // lock and unlock
  lockUser: params => {
    return axios.get(`${base}/${tag}/lock`, {
      params: params
    });
  },
  unlockUser: params => {
    return axios.get(`${base}/${tag}/unlock`, {
      params: params
    });
  },
  upRole: params => {
    return axios.get(`${base}/${tag}/upRole`, {
      params: params
    });
  }
}
