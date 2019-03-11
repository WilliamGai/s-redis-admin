import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home,
      iconCls: 'el-icon-menu',
    }, 
    {
      path: '/',
      component: Home,
      name: '测试router',
      iconCls: 'el-icon-menu',
      children: [{
        path: '/page6',
        component: HelloWorld,
        name: '测试router childeren name'
      },
    {
      path: '/page26',
      component: HelloWorld,
      name: '测试router childeren name'}]
    },
  ]
})
