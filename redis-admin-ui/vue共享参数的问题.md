# 问题描述
store.js
``` js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    redisId: 0,
    redisName: ''
  },
  mutations: {
    setRedisName(state, value) {
      state.redisName = value
    },
    setRedisId(state, value) {
      state.redisId = value
    },
  }
})

```

RedisDetail.vue
``` js
<template>
  <div>
    <RedisDetailHead />
       
    <RedisDetailChart1 />
    <RedisDetailChart2 />
  </div>
</template>
<script>
  import RedisDetailHead from '@/components/view/redis/RedisDetailHead'
  import RedisDetailChart1 from '@/components/view/redis/RedisDetailChart'
  export default {
    components: {
      RedisDetailHead,
     
      RedisDetailChart2,
       RedisDetailChart1
    }
  };
</script>
```

RedisDetailHead.vue
``` js
 <template>
  <section></section>
</template>
<script>
  import store from '@/vuex/store.js';
  import api from "../../../api/redisconfig";

  export default {
    store,
    mounted() {
       this.$store.commit('setRedisName', 'abc');
       this.$store.commit('setRedisId', '123');
    }
  };

</script>
```
RedisDetailChart.vue
``` js
<template>
  <section>

    <el-row>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <span>{{filters.id+'-'+getRedisInfo}}</span>
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
    data() {
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
    }
  };

</script>
```
# 疑问
疑问: 
为什么如果F5刷新http://localhost:8087/#/page202/5，111行就能触发；如果这个页面是

但是通过别的页面<router-link :to="'/page202/' + scope.row.id">进入就不能触发