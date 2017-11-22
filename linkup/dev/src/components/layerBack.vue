<template>
  <div>
    <transition name='fade'>
      <div class='layerBack' v-if='layerblack' @click='clearLayer'></div>
    </transition>
  </div>
</template>
<script>
 export default {
    name: 'init',
    data () {
      return {

      }
    }
 }
</script>

<style>
  @import './../assets/common/reset.less';
</style>
<style lang='less' scoped>

</style>