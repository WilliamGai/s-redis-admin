<template>
  <section>

    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <span>{{filters.id+'-'+getRedisInfo}}</span>
        <br/>
        <span>{{filters.id+'-'+filters.name}}</span>
      </el-col>
      <el-col :span="12">
        <div id="chartLine" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  import axios from 'axios';
  import echarts from 'echarts'

  import {
    dateFormat
  } from '../../../js/dateutil';
  import itemApi from "../../../api/redisconfig";
  import store from '@/vuex/store.js';

  export default {
    data() { // as same as data:function(){...}
      return {
        filters: {
          id: null,
          name: null
        },
        items: [],
        chartLine: null
      }
    },
    store,
    methods: {
      formatString(row, column) {
        return String(row[column.property]);
      },
      getItemsByApi: function (para, fn) {
        itemApi.getItem(para).then(res => fn(res))
      },

      getItems: function () {
        let para = {
          id: this.filters.id
        };
        let testObj = this.getItemsByApi(para, (res) => {
          this.items = res.data.data;
        });
      },
      drawLineChart() {
        this.chartLine = echarts.init(document.getElementById('chartLine'));
        this.chartLine.setOption({
          title: {
            text: 'Redis 内存'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['联盟广告', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        });
      },
      drawCharts() {
        this.drawLineChart()
      }
    },
    computed: {
      getRedisInfo() {
        return this.$store.state.redisName
      }
    },
    watch: {
      getRedisInfo: {
        handler: function (val) {
          console.log('%c RedisDetailChart1 通过监听方法 getRedisInfo() 监听到redisInfo变化,设置名称和ID!!!! :', 'color:#0f0;', this.$store.state.redisName);
          this.filters.name = val
          this.filters.id = this.$store.state.redisId
        }
      }
    },
    mounted() {
      if (this.$route.params.id) {
        this.filters.id = this.$route.params.id;
        this.filters.name = this.$store.state.redisName;
      }
      this.getItems();
      console.log('%c MOUNTED by RedisDetailChart1.vue this.$store.state.redisId and redisName:', 'color:#0f0;', this.$store.state.redisId, this.$store.state.redisName);
      this.drawCharts()
    },
    updated: function () {
      this.drawCharts()
    }
  };

</script>
