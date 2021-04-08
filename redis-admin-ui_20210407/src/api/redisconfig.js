import axios from 'axios';
import {
  HOST_PORT
} from '../js/config';


let base = HOST_PORT();
let tag = 'redis/config/rest';

export default {
  getItem: params => {
    return axios.get(`${base}/${tag}/get`, {
        params: params
      })
      .then(res => {
        // console.log('axios redisConfig.js getItem', res);
        // console.log('axios redisConfig getItem res.data', res.data);
        return res.data
      });
  },
  getItemList: params => {
    return axios.get(`${base}/${tag}/list`, {
        params: params
      })
      .then(res => {
        // console.log('axios redisConfig.js list res', res);
        // console.log('axios redisConfig list res.data', res.data);
        return res.data
      });
  },

  getItemListPage: params => {
    return axios.get(`${base}/${tag}/listpage`, {
      params: params
    }).then(res => {
      // console.log('axios redisConfig getItemListPage res', res);
      // console.log('axios redisConfig getItemListPage res.data', res.data);
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
  //redis
  getSingleNodeInfo: params => {
    return axios.get(`${base}/${tag}/info`, {
        params: params
      })
      .then(res => {
        return res.data
      });
  },
  getSingleNodeConfig: params => {
    return axios.get(`${base}/${tag}/config`, {
        params: params
      })
       .then(res => {
        return res.data
      });
  },
  getSingleNodeSlowLog: params => {
    return axios.get(`${base}/${tag}/slowLog`, {
        params: params
      })
      .then(res => {
        return res.data
      });
  },
  getSingleNodeConfWithDesc: params => {
    return axios.get(`${base}/${tag}/configWithDesc`, {
        params: params
      })
      .then(res => {
        return res.data
      });
  }
}
