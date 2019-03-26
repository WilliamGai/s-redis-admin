import axios from 'axios';

let base = 'http://localhost:8080';
let tag = 'auth/menu';// item name

export const getItemList = params => { return axios.get(`${base}/tag/list`, { params: params })
    .then(res =>{
        console.log('axios test requestLogin res', res);
        console.log('axios test requestLogin res.data', res.data);
        return res.data
    });
};

export const getItemListPage = params => { return axios.get(`${base}/${tag}/listpage`, { params: params }); };

export const removeItem = params => { return axios.get(`${base}/${tag}/remove`, { params: params }); };

export const batchRemoveItem = params => { return axios.get(`${base}/${tag}/batchremove`, { params: params }); };

export const editItem = params => { return axios.get(`${base}/${tag}/edit`, { params: params }); };

export const addItem = params => { return axios.get(`${base}/${tag}/add`, { params: params }); };