<template>
  <!-- 路由入口 -->
  <div id="app">
    <transition name='switch'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'init',
  data () {
    return {
      h:'',
      json:{
        sess_token:null,
        id:null,
        gamePoint:null,
        shareType:false
      },
      userId:'',
      userGift:'',
      userGiftUrl: '',
      userHeadImg: '',
      userName: ''
    }
  }
}
</script>
<!-- 这里有坑，不声明lang会用css解析less -->
<style lang='less'>
  @import './assets/common/reset.less';
  #app {
    width:100%;
    min-width:320px;
  }
</style>