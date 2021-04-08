<!-- 创建菜单 -->
<template>
  <div class='menu'>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <div class="table" style="flex: 1;padding: 0 24px;">
            <!--
                <el-table 
                :data="tableData" 
                style="width: 100%" 
                max-height="400" 最大高度，增加了有滚动条
                stripe  斑马
                >

              -->
            <el-table :data="tableData" style="width: 100%" max-height="400" stripe>
              <el-table-column type="index" :index="indexMethod">
              </el-table-column>
              <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .menu {
    background-color: rgb(209, 191, 179);
    color: #333;
    line-height: 60px;
    text-align: right;
    font-size: 12px
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
<script>
  export default {

    data() {

      const item = {
        date: '2016-05-02',
        name: '菜单管理',
        address: 'XXXX'
      };
      return {
        tableData: Array(20).fill(item),
      }
    },
    methods : {
        indexMethod(index){
          return index * 2;
        }
      }
  }

</script>
