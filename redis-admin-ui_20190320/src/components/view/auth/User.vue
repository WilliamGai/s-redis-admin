<!-- 用户管理 -->
<template>
  <section>
    <!-- 工具条 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row  style="width: 100%;" :row-class-name="tableRowClassName">

      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="staffNo" label="编号" width="100" sortable>
      </el-table-column>
      <el-table-column prop="userName" label="名称" width="100" sortable>
      </el-table-column>
      <el-table-column prop="email" label="Email" width="200" sortable>
      </el-table-column>
      <el-table-column prop="mobile" label="Mobile" width="120" sortable>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" :formatter="formatDate" sortable>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180" :formatter="formatDate" sortable>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button plain type="success" size="small" @click="handleEditRole(scope.$index, scope.row)">配置角色</el-button>
          <!-- <el-button plain type = "info" size="small" @click="handleEdit(scope.$index, scope.row)">编辑用户信息</el-button> -->
          <!-- <el-button plain type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
          <!-- as same as <el-button plain 
          :type="scope.row.status==1?'danger':'success'" 
          size="small" @click="handleStatus(scope.$index, scope.row)">
          {{scope.row.status===1?'禁用':'启用'}}
          </el-button> -->
          <el-button v-if="scope.row.status==1" plain  type="danger" size="small" @click="lockUser(scope.$index, scope.row)">禁用</el-button>
          <el-button v-else plain  type="success" size="small" @click="unlockUser(scope.$index, scope.row)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchChangeStatus" :disabled="this.sels.length===0">批量禁用</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    <!--编辑界面
            id: "0",
        name: "",
        type: 0, //0 目录, 1菜单 
        icon: 0, //菜单图标
        order_num: "",//排序
        url: ""
    -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <hr />
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

        <el-form-item v-if="editForm.id != -1" label="ID" prop="id">
          <el-input v-model="editForm.id" auto-complete="off" disabled=true></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="userName">
          <el-input v-model="editForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工编号" prop="staffNo">
          <el-input v-model="editForm.staffNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-radio-group v-model="editForm.status">
            <el-radio class="radio" :label="0">禁用</el-radio>
            <el-radio class="radio" :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
        <!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
      </div>
    </el-dialog>

    <!-- -->
    <el-dialog :title="'['+editRoleForm.userName + ']角色列表'" :visible.sync="dialogEditMenuFormVisible"
      :close-on-click-modal="false" style="width: 1000px;">
      <hr/>
      <br/>
      <Span>角色列表:</Span>
      <template>
        <el-select v-model="editRoleForm.roleId" filterable placeholder="请选择">
          <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id">
          </el-option>
        </el-select>
      </template>
      <el-button @click="addRole2User">添加</el-button>
      <br/><br/>
      <el-table :data="editRoleForm.roles" highlight-current-row style="width: 100%;" :show-header="false">
        <!-- <el-table-column prop="id" label="id" width="160">
        </el-table-column> -->
        <el-table-column prop="roleName" label="角色名称" width="160">
        </el-table-column>
        <el-table-column label="图标" width="200">
          <template slot-scope="scope">
            <a :class="scope.row.icon">{{scope.row.icon}}</a>
          </template>
          <span class="prop"></span>
        </el-table-column>

        <el-table-column label="--" width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDelRole4User(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogEditMenuFormVisible=false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- -->
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
  import userApi from "../../../api/user";
  import roleApi from "../../../api/role";
  import {
    dateFormat
  } from '../../../js/dateutil';


  export default {
    data() {
      return {
        dialogStatus: "",
        textMap: {
          update: "修改",
          create: "创建"
        },
        dialogFormVisible: false,
        dialogEditMenuFormVisible: false,
        filters: {
          name: ""
        },
        users: [],
        total: 0,
        page: 1,
        pageSize:10,
        sels: [], //列表选中列
        editFormRules: {
          name: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }]
        },

        //创建菜单界面数据
        editForm: {
          id: -1,
          userName: "",
          staffNo: "",
          status: 0,
          email: "",
          remark: ""
        },

        addFormVisible: false, //新增界面是否显示
        //addLoading: false,
        addFormRules: {
          name: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }]
        },

        editRoleForm: {
          roleName: "",
          roleIcon: "",
          roleId: null,
          userId: null,
          userName: null,
          roles: null
        },
        roles: null
      };
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.status === 1) {
          //return 'success-row';
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
        this.getUsers();
      },
      //获取用户列表
      getUsers(fn) {
        let para = {
          page: this.page,
          size: this.pageSize,
          name: this.filters.name
        };

        userApi.getItemListPage(para).then(res => {
          this.total = res.data.total;
          this.users = res.data.list;
          if (fn) {
            fn(res);
          }
        });
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm("确认删除该记录吗?", "提示", {
            type: "warning"
          })
          .then(() => {
            let para = {
              id: row.id
            };
            userApi.removeItem(para).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getUsers();
            });
          })
          .catch(e => {
            console.log('%c User.vue currRole err:', 'color:#0f0;', e);
          });
      },
      lockUser: function (index, row) {
        this.$confirm("确认要禁用此用户?", "提示", {
            type: "warning"
          })
          .then(() => {
            let para = {
              id: row.id
            };
            userApi.lockUser(para).then(res => {
              this.$message({
                message: "禁用成功",
                type: "success"
              });
              this.getUsers();
            });
          })
          .catch(e => {
            console.log('%c User.vue currRole err:', 'color:#0f0;', e);
          });
      },

      unlockUser: function (index, row) {
        this.$confirm("确认要启用此用户?", "提示", {
            type: "error"
          })
          .then(() => {
            let para = {
              id: row.id
            };
            userApi.unlockUser(para).then(res => {
              this.$message({
                message: "启用成功",
                type: "success"
              });
              this.getUsers();
            });
          })
          .catch(e => {
            console.log('%c User.vue currRole err:', 'color:#0f0;', e);
          });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        //TODO specificated attrs
        let rowParam = Object.assign({}, row);
        this.editForm = {
          id: rowParam.id,
          userName: rowParam.userName,
          email: rowParam.email,
          remark: rowParam.remark,
          status: rowParam.status,
          staffNo: rowParam.staffNo
        };
      },
      //显示新增界面
      handleAdd: function () {
        this.dialogStatus = "create";
        //this.addFormVisible = true;
        this.dialogFormVisible = true;
        this.editForm = {
          id: -1,
          userName: "",
          staffNo: "",
          status: 0,
          email: "",
          remark: ""
        }
      },
      //编辑
      updateData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {

                let para = Object.assign({}, this.editForm);

                userApi.addItem(para).then(res => {
                  //this.editLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.$refs["editForm"].resetFields();
                  //this.editFormVisible = false;
                  this.dialogFormVisible = false;
                  this.getUsers();
                });
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      //新增
      createData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {
                //this.editLoading = true;
                //NProgress.start();
                this.editForm.id = (parseInt(Math.random() * 100)).toString() // mock a id
                let para = Object.assign({}, this.editForm);
                console.log(para);

                para.birth = !para.birth || para.birth == "" ?
                  "" :
                  util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
                addItem(para).then(res => {
                  //this.addLoading = false;
                  //NProgress.done();
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.dialogFormVisible = false;
                  //this.addFormVisible = false;
                  this.getUsers();
                });
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      getRoles: function () {
        roleApi.getItemList().then(res => {
          this.total = res.count;
          this.roles = res.data;
          console.log('%c Role.vue res:', 'color:#0f0;', res);
          console.log('%c Role.vue roles:', 'color:#0f0;', this.roles);

        });
      },
      addRole2User: function () {
        let para = {
          roleId: this.editRoleForm.roleId,
          userId: this.editRoleForm.userId
        };
        userApi.addRole(para).then(res => {
          // this.dialogEditMenuFormVisible = false;
          this.$message({
            message: "添加完毕",
            type: "success"
          });

          this.getUsers((res) => {
            let currUser = this.users.find(function (r) {
              return r.id == para.userId;
            });
            console.log('%c FIND_LOG User.vue curr:', 'color:#0f0;', currUser);
            this.editRoleForm.roles = currUser.roles;
          }); //刷新表格
        });
      },
      handleDelRole4User: function (index, row) {
        this.$confirm("确认删除角色吗????", "提示", {
            type: "warning"
          })
          .then(() => {
            let para = {
              roleId: row.id,
              userId: this.editRoleForm.userId
            };
            console.log('%c DELETE_LOG User.vue para:', 'color:#0f0;', para);
            userApi.deleteRole(para).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getUsers((res) => {
                let currUser = this.users.find(function (r) {
                  return r.id == para.userId;
                });
                console.log('%c FIND_LOG User.vue curr:', 'color:#0f0;', currUser);
                this.editRoleForm.roles = currUser.roles;
              }); //刷新表格
            });
          })
          .catch(e => {
            console.log('%c User.vue currRole err:', 'color:#0f0;', e);
          });
      },
      handleEditRole: function (index, row) {

        this.dialogEditMenuFormVisible = true;

        let rowParam = Object.assign({}, row);

        this.editRoleForm = {
          roleName: "",
          roleIcon: "",
          roleId: null,
          userId: rowParam.id,
          userName: rowParam.userName,
          roles: rowParam.roles
        }

      },
    },
    mounted() {
      this.getUsers();
      this.getRoles();
    }
  };

</script>
