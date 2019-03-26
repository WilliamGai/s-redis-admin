<!-- 展开收缩按钮示例 -->
<template>
  <div>
    <el-col :span="10">
      <!-- 方法1 按钮-->
      <button v-on:click="isCollapse = !isCollapse">Change it</button>
      <!-- 方法2 左右箭头的图标 使用v-bind-->
      <div class="tools">
        <i v-bind:class="isCollapse?'el-icon-arrow-left':'el-icon-arrow-right'" @click="collapse"></i>
      </div>
      <!-- 方法3 左右箭头 使用 v-if-->
      <div class="tools" @click.prevent="collapse">
        <i v-if="isCollapse" class="el-icon-arrow-right"></i>
        <i v-else class="el-icon-arrow-left"></i>
      </div>
    </el-col>
    <!-- 方法4 按钮 -->
    <el-radio-group v-model="isCollapse">
      <el-radio-button :label="true">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
      <el-radio-button :label="false">收起</el-radio-button>

    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
         </el-submenu>
    </el-menu>
  </div>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }

</style>
<script>
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //折叠导航栏
      collapse: function () {
        this.isCollapse = !this.isCollapse;

      }
    }
  }

</script>
