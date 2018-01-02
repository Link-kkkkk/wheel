<template>
  <div class="indexContent">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {};
  },
  mounted() {
    // require.ensure([], function(require) {
    //   var vuex = require("vuex");
    // });
  }
};
</script>
<style lang="less" scoped>

</style>


