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