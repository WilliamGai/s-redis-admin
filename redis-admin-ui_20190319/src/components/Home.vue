<!-- anything begin 
  菜单
-->
<template>
  <el-container>
    <el-header>
      <el-col :span="24">
        <el-col :span="10" :class="isCollapse?'header-app-info-collapse':'header-app-info-normal'">
          {{isCollapse?'':appName}} {{isCollapse}}
        </el-col>
        <!-- 加上去只有点击才激活 -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">欢迎你,{{userName}}
            <!-- <i class="el-icon-setting el-icon--right"></i> -->
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>>
          </el-dropdown-menu>
        </el-dropdown>
        <img :src="this.userAvatar" class="user-icon" />
      </el-col>
    </el-header>
    <div>
      <div @click="test()" style="padding: 10px;width: 40px;cursor: pointer;background: #1890ff;color: #fff;">
        {{way}}
      </div>
    </div>
    <div class="container" style="display: flex;">
      <div class="aside">
        <!--
          <el-menu :default-active="$route.path" 
          unique-opened          应该是每次只能打开一个吧
          router                 开启路由，这个特别重要，加了这个后才能点击跳转
          class="el-menu-vertical-demo" 
          @open="handleOpen"     打开的时候的回调方法
          @close="handleClose"   关闭时候的回调方法
          :collapse="isCollapse" 是否可以折叠
          >

          -->
        <el-menu :default-active="$route.path" unique-opened router class="el-menu-vertical-demo" @open="handleOpen"
          @close="handleClose" :collapse="isCollapse">


          <!-- 从路由获取 -->
          <!-- <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="item.children">
              <template slot="title"><i :class="item.iconCls"></i><span>{{item.name}}</span></template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name+'cctv'+child.path}}</el-menu-item>
            </el-submenu>
              <el-menu-item v-if="!item.children" :index="item.path"><i :class="item.iconCls"></i><span>{{item.name+'cctv'+item.path}}</span></el-menu-item>
          </template> -->

          <!-- <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
            -- 如果有二级菜单 --
            <el-submenu :index="index+''" v-if="item.children">
              <template slot="title"><i :class="item.iconCls"></i><span>{{item.name}}</span></template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name+'cctv'+child.path}}</el-menu-item>
            </el-submenu>
             --如果没有二级菜单 --
            -- <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item> --
            <el-menu-item v-if="!item.children" :index="item.path"><i :class="item.iconCls"></i><span>{{item.name+'cctv'+item.path}}</span></el-menu-item>
          </template> -->
          <!--  动态拉取 -->
          <template v-for="(item, index) in roles">
            <el-submenu :index="index+''">
              <template slot="title"><i :class="item.icon"></i><span>{{item.roleName}}</span></template>
              <el-menu-item v-for="child in item.menus" :index="child.url" :key="child.url">
                <i :class="child.icon"></i>{{child.name+'cctv'+child.url}}
              </el-menu-item>
            </el-submenu>
          </template>


        </el-menu>
      </div>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
      <!-- <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">AAAAA{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                啊啊啊啊啊{{ item.name }} 嗯嗯嗯{{item.path}}ennd
                当前的path {{$route.path}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section> -->

    </div>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .header-app-info-collapse {
    background-color: rgb(65, 235, 13);
    color: #FFF;
    line-height: 60px;
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    padding-left: 20px;
  }

  .header-app-info-normal {
    background-color: rgb(150, 235, 13);
    color: #FFF;
    line-height: 60px;
    text-align: left;
    font-size: 30px;
    font-weight: bold;
  }

  .user-icon {
    cursor: pointer;
    color: #fff;

    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
  }

  .el-header {
    background-color: rgb(0, 140, 255);
    color: #333;
    line-height: 60px;
    text-align: right;
    font-size: 12px
  }

  .el-footer {
    background-color: rgb(209, 179, 203);
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-container {
    margin-bottom: 40px;
    background: rgb(255, 47, 47);
  }

</style>

<script>
  import userApi from "../api/user";

  export default {


    data() {

      return {
        way: '关闭',
        isCollapse: false,
        appName: 'CLASS-ADMIN',
        userName: '',
        userAvatar: '',
        roles:[]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      test() {
        this.isCollapse = !this.isCollapse;
        this.isCollapse == true ? this.way = '展开' : this.way = '关闭'
      }
    },
    //刷新界面的时候调用
    mounted() {
      //用户信息展示
      var user = {
        userName: "李小明",
        userAvatar: ''
      }
      //user = JSON.parse(user);
      this.userName = user.name || '未命名';
      this.userAvatar = user.avatar || require('../assets/girl.png'); //require 只接收常量
      console.log("userName=", this.userName, "userAvatar=", this.userAvatar);

      console.log('%c HOME MOUNTED !!!!! :', 'color:#0f0;');
      let para = {
        id: 276
      };

      userApi.getItem(para).then(res => {
        let rstCode = res.data.code;
        let user = res.data.data;
        let roles = user.roles;
        console.log('%c HOME MOUNTED USER RES_CODE :', 'color:#0f0;', rstCode);
        console.log('%c HOME MOUNTED USER :', 'color:#0f0;', user);
        console.log('%c HOME MOUNTED ROLES :', 'color:#0f0;', roles);
        this.roles = roles;
      });
      
    }
  }

</script>
