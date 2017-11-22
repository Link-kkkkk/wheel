<template>
  <div class='warp' :style='warp'>
    <div class='icon' :style='icon'></div>
    <down></down>
    <preload></preload>
  </div>
</template>
<script>
import backimg from '../../static/404.png'
import down from './../components/down'
import preload from './../components/preload'

export default {
  name: 'init',
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
      },
      utime: this.$common.common.$_GET('utime'),
      sign: this.$common.common.$_GET('sign'),
      pageTitle: '',
      warp: null,
      icon: null,
    }
  },
  components: {
    down,
    preload
  },
  mounted() {
    var _this = this

    this.$nextTick(function() {
      this.$common.common.preLoading("stressing");
      this.$common.actjs.resizeWindow();
      _this.routerGo();
      var clientH = document.documentElement.clientHeight;
      this.warp = {
        'height': clientH + 'px',
        'width': '100%',
        'background-color': '#d5dde1',
        'background-size': '100% 100%'
      }
      $('.warp').css('height', clientH + 'px');
    })
  },
  methods: {
    routerGo() {
      var _this = this
      switch (this.$common.common.$_GET('type') || this.$common.common.$_GET('route')) {
        case 'bodyCardio':
          _this.$router.push({ path: '/bodyCardio' })
          break;
        case 'bong':
          _this.$router.push({ path: '/bong' })
          break;
        case 'milk':
          _this.$router.push({ path: '/milk' })
          break;
        case 'milkDetail':
          _this.$router.push({ path: '/milkDetail' })
          break;
        case 'mealPowder':
          _this.$router.push({ path: '/mealPowder' })
          break;
        case 'mealPowder2':
          _this.$router.push({ path: '/mealPowder2' })
          break;
        case 'outCardio':
          _this.$router.push({ path: '/outCardio' })
          break;
        case 'outBong':
          _this.$router.push({ path: '/outBong' })
          break;
        default:
          this.icon = {
            'height': '12.166667rem',
            'width': '17.233333rem',
            'background': 'url(' + backimg + ') top left no-repeat',
            'background-size': '100% 100%'
          }
          break;
      }
    },
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
.icon {
  position: absolute;
  top: 5rem;
  left: calc(~'50% - 17.23rem/2');
}
</style>