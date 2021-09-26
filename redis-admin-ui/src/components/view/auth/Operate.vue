<!-- 用户操作日志 -->
<template>
  <section>
    <!-- 工具条 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" v-on:click="getItems">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>


    <!--列表-->
    <el-table :data="items" highlight-current-row  style="width: 100%;" :row-class-name="tableRowClassName2">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="userNo" label="编号" width="200" sortable>
      </el-table-column>
      <el-table-column prop="userName" label="名称" width="100" sortable>
      </el-table-column>
      <el-table-column prop="email" label="Email" width="200" sortable>
      </el-table-column>
      <el-table-column prop="method" label="method" width="100" sortable>
      </el-table-column>
      <el-table-column prop="uri" label="uri" width="200" sortable>
      </el-table-column>
      <el-table-column label="耗时" width="120" sortable>
        <template slot-scope="scope">
          {{scope.row.timeUsed+'毫秒'}}
        </template>
			</el-table-column>
 
      <el-table-column prop="updateTime" label="操作时间" width="180" :formatter="formatDate" sortable>
      </el-table-column>
    </el-table>
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
  </section>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<script>
  import operateApi from "../../../api/operate";
  import {
    dateFormat
  } from '../../../js/dateutil';


  export default {
    data() {
      return {
        dialogFormVisible: false,
        dialogEditMenuFormVisible: false,
        filters: {
          name: ""
        },
        items: [],
        total: 0,
        page: 1,
        pageSize:10
      };
    },
    methods: {
      tableRowClassName2({row, rowIndex}) {
        if (row.method == 'GET') {
          return 'success-row';
        } else {
          return 'warning-row';
        }
        return '';
      },
      formatDate(row, column) {
        return dateFormat(row[column.property]);
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getItems();
      },
      getItems(fn) {
        let para = {
          page: this.page,
          size: this.pageSize,
          name: this.filters.name
        };

        operateApi.getItemListPage(para).then(res => {
          this.total = res.data.total;
          this.items = res.data.list;
          if (fn) {
            fn(res);
          }
        });
      }
    },
    mounted() {
      this.getItems();
    }
  };

</script>
