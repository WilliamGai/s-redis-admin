## 路由
``` html
<el-table-column label="onlineClassId" width="160">
        			<template slot-scope="scope">
						<router-link :to="'/page3/' + scope.row.id">
						{{scope.row.id}}
						</router-link>
          				<!-- <a :href="scope.row.id" >{{scope.row.id}}</a> -->
        			</template>
        			<span class="prop"></span>
				</el-table-column>
```