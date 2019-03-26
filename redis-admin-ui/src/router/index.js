import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'

/** Auth */
//用户表
import User from '@/components/view/auth/User'
//菜单
import Menu from '@/components/view/auth/Menu'

import Role from '@/components/view/auth/Role'

import Operate from '@/components/view/auth/Operate'

import Echarts from '@/components/view/nav1/Echarts'
import Echarts2 from '@/components/view/nav1/Echarts2'



Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: Home,
      iconCls: 'el-icon-menu',
    }
    ,
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
          component: User,
          name: '测试router childeren name is User'
        }
      ]
    },{
      path: '/',
      component: Home,
      name: '权限管理',
      iconCls: 'el-icon-service',
      children: [{
          path: '/page70',
          component: User,
          name: '用户'
        },
        {
          path: '/page71',
          component: Menu,
          name: '菜单管理'
        }, {
          path: '/page72',
          component: Role,
          name: '角色管理'
        }
        , {
          path: '/page73',
          component: Operate,
          name: '操作日志'
        }
      ]
    }
    //测试图表
    ,
    {
      path: '/',
      component: Home,
      name: '测试图表',
      iconCls: 'el-icon-menu',
      children: [{
          path: '/page81',
          component: Echarts,
          name: '测试图表菜单'
        },
        {
          path: '/page82',
          component: Echarts2,
          name: '测试图表菜单2'
        }
      ]
    }
  ]
})
