<template>
  <div class="warp">
    <children>
      <p slot="first" @click="toSpan(12345)">只有点击这句话的区域才会生效</p>
      <p slot="second">56789</p>

      <span slot="three">abcde</span>
      <!--上面这行不会显示 因为没有多出来的solt标签-->
    </children>
  </div>
</template>
<script>
import down from './../components/down'
import preload from '@/components/preload'

export default {
  name: 'soltDemo',
  data() {
    return {
      comName: 'soltDemo'
    }
  },
  mounted() {
    var _this = this
    console.log(this.comName)
  },
  methods: {
    toSpan(inner) {
      console.log(inner)
    }
  },
  components: {
    down,
    preload,
    children: {    //这个无返回值，不会继续派发
      template: "<div>" +
      "<slot name='first'>这里内部的内容会被插入的内容替代</slot>" +
      "点击这里及之后都不会生效" +
      "<slot name='second'></slot>" +
      "</div>"
    }
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
</style>

