<!-- anything begin 
 总是调试不好的例子
-->
<template>

  <el-container >
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>


    <el-container>

      <el-aside width="300px" style="background-color: rgb(238, 241, 246)">


        <div class="tools">
          <i v-bind:class="isCollapse?'el-icon-arrow-left':'el-icon-arrow-right'" @click="collapse"></i>
        </div>

        <el-menu :default-openeds="['1', '2']" :collapse="isCollapse" :collapse-transition=true>


          <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
            <!-- 如果有二级菜单 -->
            <el-submenu :index="index+''" v-if="item.children">
              <template slot="title"><i :class="item.iconCls"></i><span>{{item.name}}</span></template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <!-- 如果没有二级菜单 -->
            <!-- <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item> -->
            <el-menu-item v-if="!item.children" :index="item.path"><i :class="item.iconCls"></i><span>{{item.name}}</span></el-menu-item>
          </template>


          <el-submenu index="11">
            <template slot="title"><i class="el-icon-message"></i><span>导航一</span></template>
            <el-menu-item-group>
              <el-menu-item index="11-1">选项1</el-menu-item>
              <el-menu-item index="11-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


          <el-submenu index="12">
            <template slot="title"><i class="el-icon-menu"></i><span>导航二</span></template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="12-1">选项1</el-menu-item>
              <el-menu-item index="12-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="12-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="12-4">
              <template slot="title">选项4</template>
              <el-menu-item index="12-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>

          <!-- -->
        </el-menu>
      </el-aside>
      <!-- 侧边栏和main panel css生效-->
      <el-container >
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>

  </el-container>


</template>





<style>
  .el-container {
    margin-bottom: 40px;
    background: rgb(255, 47, 47);
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-footer {
    background-color: rgb(209, 179, 203);
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background: greenyellow
  }

  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    background: yellow
  }

  /* 
  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body>.el-container {
    margin-bottom: 40px;
    background: greenyellow;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */

</style>


<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        isCollapse: false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //折叠导航栏 即  <button v-on:click="isCollapse = !isCollapse">Change it</button>
      collapse: function () {
        this.isCollapse = !this.isCollapse;
      }
    }
  };

</script>
