2019年03月10日19:33:03

## 导航中 <span> 必须加，否则折叠后会仍然能能看到文字

``` xml
el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i><span>导航一</span></template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
```
## 折叠菜单 折叠的时候会卡顿
官网的例子不卡但是 放在自己的里面卡，添加:collapse-transition=false 进制动画来消除卡顿，但是没有动画
``` 
        <el-menu :default-openeds="['1', '2']" :collapse="isCollapse" :collapse-transition=false>

```
## 自定义 单元格
``` xml
			<el-table-column label="图标示例" width="200">
        <template slot-scope="scope">
          <a :class="scope.row.icon" >{{scope.row.icon}}</a>
        </template>
        <span class="prop"></span>
			</el-table-column>
```
``` xml
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button plain type="success" size="small" @click="handleEditRole(scope.$index, scope.row)">配置菜单</el-button>
          <el-button plain 
            :type="scope.row.status==1?'danger':'success'" 
            size="small" @click="handleStatus(scope.$index, scope.row)">
            {{scope.row.status===1?'禁用':'启用'}}
          </el-button>
        </template>
      </el-table-column>
```