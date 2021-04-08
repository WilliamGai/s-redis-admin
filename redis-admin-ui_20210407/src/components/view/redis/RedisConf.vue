
<template>
	<section>
		
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.id" placeholder="id"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getItems">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		
		<template>
			<el-table :data="items" highlight-current-row v-loading="loading" style="width: 100%;" stripe>
				<el-table-column type="index" width="60">
				</el-table-column>
				 
				<el-table-column prop="name" label="属性" width="260" height ="200">
				</el-table-column>
				<el-table-column prop="value" label="值" width="220" :formatter="formatString">
				</el-table-column>
				<el-table-column prop="desc" label="备注" width="800" :formatter="formatString">
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	//引入axios
	import axios from 'axios';
  	import api from "../../../api/redisconfig";

	export default {
		data() { // as same as data:function(){...}
			return {
				filters: {
					id: null
				},
				loading: false,
				items: []
			}
		},
		methods: {
			formatString(row, column) {
        		return String(row[column.property]);
      		},
			getItemsByApi: function (para, fn) {
				api.getSingleNodeConfWithDesc(para).then(res => fn(res))
			},

			getItems: function () {
				let para = {
					id: this.filters.id
				};
				this.loading = true;
				let testObj = this.getItemsByApi(para, (res) => {
					this.items = res.data;
					console.log('%c MOUNTED by this.items=', 'color:#0f0;',this.items);
					console.log('%c MOUNTED by res.data=', 'color:#0f0;',res.data);
					this.loading = false;
				});
			}
		},
		mounted() {
			if(this.$route.params.id){
				this.filters.id = this.$route.params.id;
			}
			this.getItems();
		}
	};
</script>

<style scoped>

</style>