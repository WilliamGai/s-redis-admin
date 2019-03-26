<!-- anything begin -->
<template>
  <div>
    <el-col>
      <div class="tools">
        <i v-bind:class="isCollapse?'el-icon-arrow-left':'el-icon-arrow-right'" @click="collapse"></i>
      </div>

      <!-- <div class="tools" @click.prevent="collapse">
        <i v-if="isCollapse" class="el-icon-arrow-right"></i>
        <i v-else class="el-icon-arrow-left"></i>
      </div> -->
    </el-col>
    <el-radio-group v-model="isCollapse" >
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
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style>
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

</style>
<script>
  export default {
    data() {
      return {
        isCollapse: false
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
