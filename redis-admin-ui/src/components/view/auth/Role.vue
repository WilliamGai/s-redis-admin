<!-- 角色列表 
TODO 如何排除JS异常
-->
<template>
  <section>
    <!-- 工具条 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="角色名称"></el-input>
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
      <!-- prop 和 v-model里定义的变量名要一致 否则找不到v-model的初始值不能被这一列的属性赋值 下面的例子roleName和 name不一致需要特殊处理 -->
      <el-table-column prop="roleName" label="角色名称" width="120" sortable>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="120" sortable>
      </el-table-column>
			<el-table-column label="图标示例" width="200">
        <template slot-scope="scope">
          <a :class="scope.row.icon" >{{scope.row.icon}}</a>
        </template>
        <span class="prop"></span>
			</el-table-column>
      <!-- <el-table-column prop="menuIds" label="菜单Ids" width="100" sortable>
      </el-table-column>
      <el-table-column prop="menuNames" label="菜单列表" width="100" :formatter="formatJoin" sortable>
      </el-table-column> -->

      <el-table-column prop="createTime" label="创建时间" width="180" :formatter="formatDate" sortable>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="180" :formatter="formatDate" sortable>
      </el-table-column>
      <el-table-column label="--" width="280">
        <template slot-scope="scope">
          <el-button plain type="success" size="small" @click="handleEditMenu(scope.$index, scope.row)">配置菜单</el-button>
          <el-button plain type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑信息</el-button>
          <el-button plain type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
		  </el-pagination>
    </el-col>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <hr />
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item v-if="editForm.id != -1" label="角色ID" prop="id">
          <el-input v-model="editForm.id" auto-complete="off" disabled=true></el-input>
        </el-form-item>

        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色图标" prop="icon">
          <el-input v-model="editForm.icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色备注" prop="remark">
          <el-input v-model="editForm.remark" auto-complete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click.native="dialogFormVisible=false">取消</el-button>
        <el-button plain v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button plain v-else type="primary" @click="updateData">修改</el-button>
        <!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
      </div>
    </el-dialog>

    <!-- 
      编辑菜单按对话框
    -->
    <el-dialog :title="'['+editMenuForm.roleName + ']菜单列表'" :visible.sync="dialogEditMenuFormVisible"
      :close-on-click-modal="false" style="width: 1100px;">
      <hr/>
      <br/>
      <Span>菜单列表:</Span>
      <template>
        <el-select v-model="editMenuForm.menuId" filterable placeholder="请选择">
          <el-option v-for="item in menus" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </template>
      <el-button @click="addMenu2Role">添加</el-button>
      <br/><br/>
      <!-- <Span>{{editMenuForm}}</Span> -->
      <el-table :data="editMenuForm.menus" highlight-current-row style="width: 100%;" :show-header="false">
        <!-- <el-table-column prop="id" label="id" width="60">
        </el-table-column> -->
        <el-table-column prop="name" label="菜单名称" width="160">
        </el-table-column>
        <el-table-column label="图标" width="200">
          <template slot-scope="scope">
            <a :class="scope.row.icon">{{scope.row.icon}}</a>
          </template>
          <span class="prop"></span>
        </el-table-column>
        <el-table-column label="--" width="60">
          <template slot-scope="scope">
            <el-button plain type="warning" size="small" @click="handleUpMenu4Role(scope.$index, scope.row)">↑</el-button>
          </template>
        </el-table-column>
        <el-table-column label="--" width="80">
          <template slot-scope="scope">
            <el-button plain type="danger" size="small" @click="handleDelMenu4Role(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogEditMenuFormVisible=false">关闭</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import roleApi from "../../../api/role";
  import menuApi from "../../../api/menu";

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
        items: [],
        total: 0,
        page: 1,
        pageSize:10,

        editFormRules: {
          name: [{
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }],
          remark: [{
            required: true,
            message: "请输入角色备注",
            trigger: "blur"
          }],
          icon: [{
            required: true,
            message: "请输入角色图标",
            trigger: "blur"
          }]

        },

        //创建角色界面数据
        editForm: {
          id: -1,
          name: "",
          remark: "",
          icon: "el-icon-success"
        },

        //创建角色界面数据
        editMenuForm: {
          roleName: "", //角色名称
          menuName: "", //菜单名称
          menuIcon: "", //菜单图标
          roleId: null, //角色ID
          menuId: null, //菜单ID
          menus: null //已有的菜单列表
        },


        newRoleMenu: "",

        addFormVisible: false, //新增界面是否显示
        addFormRules: {
          name: [{
            required: true,
            message: "请输入角色名称",
            trigger: "blur"
          }]
        },
        menus: null
      };
    },
    methods: {
      formatDate(row, column) {
        return dateFormat(row[column.property]);
      },
      formatJoin(row, column) {
        return row[column.property].join('; ');
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getItems();
      },
      //获取列表
      getItems(fn) {
        let para = {
          page: this.page,
          size: this.pageSize,
          name: this.filters.name
        };
        roleApi.getItemListPage(para).then(res => {
          this.total = res.data.total;
          this.items = res.data.list;
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
            roleApi.removeItem(para).then(res => {
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
      handleEdit: function (index, row) {
        this.dialogStatus = "update"; // TODO REMOVE ERROR

        this.dialogFormVisible = true;
        //this.editForm = Object.assign({}, row);

        let rowParam = Object.assign({}, row);


        console.log('%c OBJ_LOG rowParam before:', 'color:#0f0;', rowParam);
        /**
         不建议这样做
         this.editForm = rowParam;
        */
        this.editForm = {
          id: rowParam.id,
          name: rowParam.roleName,
          remark: rowParam.remark,
          icon: rowParam.icon
        };

        console.log('%c OBJ_LOG this.editForm:', 'color:#0f0;', this.editForm);
        console.log('%c OBJ_LOG rowParam:', 'color:#0f0;', rowParam);

      },

      //显示菜单编辑按钮界面
      handleEditMenu: function (index, row) {

        this.dialogEditMenuFormVisible = true;
        let rowParam = Object.assign({}, row);

        console.log('%c OBJ_LOG rowParam before:', 'color:#0f0;', rowParam);
        this.editMenuForm = {
          roleName: rowParam.roleName,
          menuName: "",
          menuIcon: "",
          roleId: rowParam.id,
          menuId: null,
          menus: rowParam.menus
        };

        console.log('%c OBJ_LOG this.editForm:', 'color:#0f0;', this.editForm);
        console.log('%c OBJ_LOG rowParam:', 'color:#0f0;', rowParam);

      },
      //显示新增界面
      handleAdd: function () {
        this.dialogStatus = "create";
        this.dialogFormVisible = true; //TODO  DEBUG  ERR
        //新增清空数据
        this.editForm = {
          id: -1,
          name: "",
          remark: "",
          icon: ""
        }
      },
      //编辑
      updateData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {

                let para = Object.assign({}, this.editForm);
                roleApi.editItem(para).then(res => {
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
      createData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {
                let para = Object.assign({}, this.editForm);
                console.log('createData para', para);
                roleApi.addItem(para).then(res => {
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
      getMenus: function () {
        menuApi.getItemList().then(res => {
          this.total = res.count;
          this.menus = res.data;
          console.log('%c Role.vue res:', 'color:#0f0;', res);
          console.log('%c Role.vue menus:', 'color:#0f0;', this.menus);

        });
      },
      addMenu2Role: function () {
        let para = {
          roleId: this.editMenuForm.roleId,
          menuId: this.editMenuForm.menuId
        };
        roleApi.addMenu(para).then(res => {
          // this.dialogEditMenuFormVisible = false;
          this.$message({
            message: "添加完毕",
            type: "success"
          });

          this.getItems((res) => {
            let currRole = this.items.find(function (r) {
              return r.id == para.roleId;
            });
            console.log('%c Role.vue currRole:', 'color:#0f0;', currRole);
            this.editMenuForm.menus = currRole.menus;
          }); //刷新表格


        });
      },
      //handleDelMenu4Role
      handleDelMenu4Role: function (index, row) {
        this.$confirm("确认删除该记录吗?", "提示", {
            type: "warning"
          })
          .then(() => {
            let para = {
              menuId: row.id,
              roleId: this.editMenuForm.roleId
            };
            roleApi.deleteMenu(para).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getItems((res) => {
                let currRole = this.items.find(function (r) {
                  return r.id == para.roleId;
                });
                console.log('%c Role.vue currRole:', 'color:#0f0;', currRole);
                this.editMenuForm.menus = currRole.menus;
              }); //刷新表格
            });
          })
          .catch(() => {});
      },
      handleUpMenu4Role: function (index, row) {
        this.$confirm("确认上移该记录吗?", "提示", {
            type: "warning"
          })
          .then(() => {
            let para = {
              menuId: row.id,
              roleId: this.editMenuForm.roleId
            };
            roleApi.upMenu(para).then(res => {
              this.$message({
                message: "上移成功",
                type: "success"
              });
              this.getItems((res) => {
                let currRole = this.items.find(function (r) {
                  return r.id == para.roleId;
                });
                console.log('%c Role.vue currRole:', 'color:#0f0;', currRole);
                this.editMenuForm.menus = currRole.menus;
              }); 
            });
          })
          .catch(() => {});
      }
    },
    mounted() {
      console.log('%c Role.vue mounted:', 'color:#0f0;');
      this.getItems();
      this.getMenus();
    }
  };

</script>