<template>
  <div class='user'>


    <!-- <el-container>
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>

      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="onlineClassId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="studentId(选填)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

 
      <!-- table --end -->

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
  .user {
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
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
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
