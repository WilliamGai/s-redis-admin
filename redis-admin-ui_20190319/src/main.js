// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// element-ui 2019年03月09日17:26:13
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// axios 2019年03月12日16:55:26 
import axios from 'axios'// @gaojianming says: don't do this
//Vue.use(axios) don't do this
// font-awesome 2019年03月18日19:25:39
import 'font-awesome/css/font-awesome.css'

// 拦截器 gebaoning 2019年03月18日
require('./api/httpinterceptor')
// import httpinterceptors from './api/httpinterceptor'
// axios.interceptors.request.use(function(){
//   console.log('here')
// });
//axios.defaults.withCredentials = true 2019年03月19日12:23:18 禁用axios传cookie
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
