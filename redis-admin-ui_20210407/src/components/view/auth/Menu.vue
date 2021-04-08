<!-- 菜单列表 -->
<template>
	<section>
		<!-- 工具条 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="菜单名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button plain type="primary" v-on:click="getItems">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button plain type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="items" highlight-current-row style="width: 100%;" stripe>
      <el-table-column prop="id" label="id" width="60">
			</el-table-column>
			<el-table-column prop="name" label="菜单名称" width="120" sortable>
			</el-table-column>
      <!-- 使用插槽自由组合 TODO 空格-->
			<el-table-column label="图标示例" width="200">
        <template slot-scope="scope">
          <a :class="scope.row.icon" >{{scope.row.icon}}</a>
        </template>
        <span class="prop"></span>
			</el-table-column>
      <!-- <el-table-column prop="icon" label="菜单图标" width="120" sortable>
			</el-table-column> -->
      <el-table-column prop="url" label="url" width="120" sortable>
			</el-table-column>
      <!-- <el-table-column prop="orderNum" label="排序权重" width="100" sortable>
			</el-table-column> -->
			<el-table-column prop="createTime" label="创建时间" width="180" :formatter="formatDate" sortable>
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" width="180" :formatter="formatDate" sortable>
			</el-table-column>
      <el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button plain type = "success" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button plain type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

	  <el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--编辑界面
            id: "0",
        name: "",
        type: 0, //0 目录, 1菜单 
        icon: "", //菜单图标
        orderNum: "",//排序
        url: ""
    -->
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<hr/>
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item v-if="editForm.id != -1" label="菜单ID" prop="id">
					<el-input v-model="editForm.id" auto-complete="off" disabled=true></el-input>
				</el-form-item>
				<el-form-item label="菜单名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="菜单图标" prop="icon">
					<el-input v-model="editForm.icon" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="排序权重" prop="orderNum">
					<el-input-number v-model="editForm.orderNum" :min="-10000" :max="10000"></el-input-number>
				</el-form-item> -->
				<el-form-item label="连接地址" prop="url">
					<el-input type="textarea" v-model="editForm.url"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			  <el-button plain @click.native="dialogFormVisible=false">取消</el-button>
			  <el-button plain v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button plain v-else type="primary" @click="updateData">修改</el-button>
				<!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
			</div>
		</el-dialog>
	</section>
</template>

<script>

import menuApi from "../../../api/menu";
import { dateFormat } from '../../../js/dateutil';

export default {
  data() {
    return {
      dialogStatus: "",
      textMap: {
        update: "修改",
        create: "创建"
      },
      dialogFormVisible: false,
      filters: {
        name: ""
      },
      items: [],
      total: 0,
      page: 1,
      pageSize: 10,
     // listLoading: false,v-loading="listLoading"
      sels: [], //列表选中列

      editFormRules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        icon: [{ required: true, message: "请输入菜单icon", trigger: "blur" }],
        url: [{ required: true, message: "请输入菜单url", trigger: "blur" }],
        orderNum: [{ required: true, message: "请输入菜单排序权重", trigger: "blur" }]

      },

      //创建菜单界面数据
      editForm: {
        id: -1,
        name: "",
        icon: "el-icon-success", //菜单图标
        orderNum: 1000,//排序
        url: ""
      },

      addFormVisible: false, //新增界面是否显示
      addFormRules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        icon: [{ required: true, message: "请输入菜单icon", trigger: "blur" }],
        url: [{ required: true, message: "请输入菜单url", trigger: "blur" }],
        orderNum: [{ required: true, message: "请输入菜单排序权重", trigger: "blur" }]
      }
    };
  },
  methods: {
    formatDate(row, column) {
				return dateFormat(row[column.property]);
    },
    handleCurrentChange(val) {
        this.page = val;
        this.getItems();
    },
    //获取列表
    getItems() {
      let para = {
        page: this.page,
        size: this.pageSize,
        name: this.filters.name
      };
      menuApi.getItemListPage(para).then(res => {
        this.total = res.data.total;
        this.items = res.data.list;
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {

          let para = { id: row.id };
          menuApi.removeItem(para).then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getItems();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      //新增清空数据
      this.editForm = {
        id: -1,
        name: "",
        icon: "", //菜单图标
        orderNum: 1000,//排序
        url: ""
			}
    },
    //编辑
    updateData:function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {

              let para = Object.assign({}, this.editForm);
              menuApi.editItem(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                this.getItems();
              });
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
    },
    //新增
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {})
            .then(() => {
                let para = Object.assign({}, this.editForm);
                console.log('createData para', para);
                menuApi.addItem(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.dialogFormVisible = false;
                this.getItems();
              });
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
    }
  },
  mounted() {
    console.log('%c Menu.vue mounted:', 'color:#0f0;');
    this.getItems();
  }
};
</script>
