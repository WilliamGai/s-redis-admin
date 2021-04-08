<template>
  <div>
    <RedisDetailHead />
       
    <!-- <RedisDetailChart1 /> -->
    <RedisDetailChart2 />
  </div>
</template>
<script>
  import RedisDetailHead from '@/components/view/redis/RedisDetailHead'
  import RedisDetailChart1 from '@/components/view/redis/RedisDetailChart1'
  import RedisDetailChart2 from '@/components/view/redis/RedisDetailChart2'

  export default {
    components: {
      RedisDetailHead,
     
      RedisDetailChart2,
       RedisDetailChart1
    }
  };
</script>
<!-- 各个组件不是顺序加载的 -->