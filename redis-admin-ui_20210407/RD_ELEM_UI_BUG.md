# bugs

## 侧边栏菜单点击两次才能是选中状态 2019年03月20日22:43:40

旧版本1.XX版本的:index="child.path" 如果设置的值是 page70这样，虽然也能点击换页面，但是需要再点一次才能 isActive高亮
新版本比如现在用的不存在此问题，不过为了谨慎，统一使用 /page70这样的写法

``` html
        <template v-for="(item, index) in roles">
            <el-submenu :index="index+''">
              <template slot="title"><i :class="item.icon"></i><span>{{item.roleName}}</span></template>
              <el-menu-item v-for="child in item.menus" :index="child.url" :key="child.url">
                <i :class="child.icon"></i>{{child.name+'cctv'+child.url}}
              </el-menu-item>
            </el-submenu>
          </template>
```

## 表格自定义样式 新老版本VUE写法不同

    methods: {
      tableRowClassName2({row, rowIndex}) {
        if (row.method == 'GET') {
          return 'success-row';
        } else {
          return 'warning-row';
        }
        return '';
      },


            tableRowClassName2(row, rowIndex) {
        if (row.method == 'GET') {
          return 'success-row';
        } else {
          return 'warning-row';
        }
        return '';
      },

## ElemUI 单元格不显示布尔值的问题

``` xml
<el-table-column prop="value" label="值" width="350" :formatter="formatString">
</el-table-column>
		methods: {
			formatString(row, column) {
        		return String(row[column.property]);
              }
        }
```

## 明明 elem CSS定义了左对齐, 但是工具栏的搜索框和按钮仍然居中
``` html
<div class="toolbar el-col el-col-24" style="padding-bottom: 0px;"><form class="el-form el-form--inline"><div class="el-form-item">
css:
[class*=el-col-] {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
```
解决方方法 修改 App.vue这个生成的文件text-align: center; 文字居中对其 会使框内元素也居中对其
``` html
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
}
</style>
```

## 其他项目 侧边栏菜单较多无滚动条

``` css
overflow-y: scroll;
```