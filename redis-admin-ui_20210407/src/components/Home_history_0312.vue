<!-- 
   流畅的展开和关闭
   菜单从路由中选择
-->
<template>
  <el-container>
       <el-header>
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
    <div>
      <div @click="test()" style="padding: 20px;width: 70px;cursor: pointer;background: #1890ff;color: #fff;">
        {{way}}
      </div>
    </div>
    <div class="container" style="display: flex;">
      <div class="aside">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        
    <!-- -->
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

   <!-- -->
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
        </el-menu>
      </div>
      <div class="table" style="flex: 1;padding: 0 24px;">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </div>
      <!-- table --end -->
    </div>
     <el-footer>Footer</el-footer>
  </el-container>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

    .el-header {
    background-color: #B3C0D1;
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

</style>

<script>
  export default {

    data() {
      
      return {
        way: '关闭',
        isCollapse: false,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
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
    }
  }

</script>
