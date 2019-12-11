<template>
  <section>
    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.id" placeholder="id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="showInfo">info</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="showConfig">config</el-button>
          </el-form-item>
           <el-form-item>
            <el-button type="primary" v-on:click="showSlowLog">slowLog</el-button>
          </el-form-item>
          <br />

          <span>{{filters.name}}</span>

        </el-form>
      </el-col>

      <el-dialog :title="filters.name" :visible.sync="dialogVisible" width="60%">
        <textarea cols="130" rows="30" readonly>{{dialogInfo}}</textarea>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>

    </el-row>
  </section>
</template>
<script>
  import store from '@/vuex/store.js';
  import api from "../../../api/redisconfig";

  export default {
    data() { // as same as data:function(){...}
      return {
        filters: {
          id: null,
          name: null
        },
        dialogInfo: '暂无信息',
        dialogVisible: false
      }
    },
    store,
    methods: {
      showInfo() {
        this.dialogVisible = true;
        let para = {
          id: this.filters.id
        };
        this.getSingleNodeInfoByApi(para, (res) => {
          this.dialogInfo = res.data;
        });
      },
      showConfig() {
        this.dialogVisible = true;
        let para = {
          id: this.filters.id
        };
        this.getSingleNodeConfigByApi(para, (res) => {
          this.dialogInfo = res.data;
        });
      },
      showSlowLog() {
        this.dialogVisible = true;
        let para = {
          id: this.filters.id
        };
        this.getSingleNodeSlowLogByApi(para, (res) => {
          this.dialogInfo = res.data;
        });
      },
      getItems() {
        
        console.log('%c this.$route.params.id :', 'color:#0f0;', this.$route.params.id);
        console.log('%c store.state.count :', 'color:#0f0;', this.$store.state.count);
        let para = {
          id: this.filters.id
        };
        let testObj = this.getItemsByApi(para, (res) => {
          this.filters.name = res.data.name;
        });
      },
      getItemsByApi: function (para, fn) {
        api.getItem(para).then(res => fn(res))
      },
      getRedisInfoByApi: function (para, fn) {
        api.getItem(para).then(res => fn(res))
      },
      getSingleNodeInfoByApi: function (para, fn) {
        api.getSingleNodeInfo(para).then(res => fn(res))
      },
      getSingleNodeConfigByApi: function (para, fn) {
        api.getSingleNodeConfig(para).then(res => fn(res))
      },
      getSingleNodeSlowLogByApi: function (para, fn) {
        api.getSingleNodeSlowLog(para).then(res => fn(res))
      }
    },
    watch: {
      'filters.name': function (val) {
        console.log('%c header 监听到 filter.name, 设置setRedisName 设置setRedisId:', 'color:#0f0;', this.filters.name);
        this.$store.commit('setRedisName', this.filters.name);
        this.$store.commit('setRedisId', this.filters.id);
      }
      // ,
      // 'filters.id': function (val) {
      //   console.log("header 监听到 filter.id");
      //   this.getItems();
      // }
    },
    mounted() {
      if (this.$route.params.id) {
        this.filters.id = this.$route.params.id;
      }

      this.getItems();
      console.log('%c MOUNTED by RedisDetailHead.vue this.$store.state.redisName=', 'color:#0f0;',this.$store.state.redisName);
    }
  };

</script>
