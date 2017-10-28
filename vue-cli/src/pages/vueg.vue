<template>
  <div class="warp">
    <button @click='goOther'>click me to other</button>
    <down :down-data='downData'></down>
    <preload></preload>
    <!-- @post接收到时触发listener方法 -->
    <pv :pv-data='pvData' ref='pvCom' @post='listener()'></pv>
    <!-- 可以自动识别驼峰命名转换 -->
    <share-info :act-data='actData'></share-info>
    <remote src='https://act.hxsapp.com/html/common/prism-min.js'></remote>
    <remote src='https://act.hxsapp.com/html/psychol/js/customPlayStyle.js'></remote>
  </div>
</template>
<script>
import down from './../components/down'
import preload from '@/components/preload'
import pv from '@/components/pv'
import remote from '@/components/remote.vue'
import shareInfo from '@/components/shareInfo.vue'

export default {
  name: 'vuegDemo',
  data() {
    return {
      name: 'vuegDemo',
      out: false,
      pvData: {
        act_id : 108
      },
      actData: {
        act_id : 108,
        // link : 'www.zhihu.com',
        // descr : 'salahei'
      },
      downData : {
        url : 'https://www.hxsapp.com/download'
      }
    }
  },
  mounted() {
    this.$common.common.init(this.href);

    document.title = this.name
    var _this = this
    var token = this.$common.common.getUrlParam('sess_token')

    //可以获取子组件的方法
    this.$refs.pvCom.con()
    // setTimeout( () => {
    //   this.$refs.pvCom.hidding()
    // }, 2000);

    if (!this.$common.common.isApp()) {
      this.out = true
    }
  },
  methods: {
    goOther() {
      var _this = this
      this.$router.push({
        name: 'milkDetail'
      })
    },
    listener () {
      console.log('i`m trigger by children components')
    }
  },
  components: {
    down,
    preload,
    pv,
    remote,
    shareInfo
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
.warp {
  box-shadow: none !important;
}
</style>

