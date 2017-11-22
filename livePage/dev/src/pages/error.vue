<template>
 <div class='warp' :style='warp'>
  <div class='icon' :style='icon'></div>
 </div>
</template>
<script>
  import backimg from '../../static/404.png'
  export default {
    name: 'init',
    data () {
      return {
        warp : null,
        icon : null
      }
    },
    mounted () {
      var _this = this
      this.$common.actjs.resizeWindow();
      this.$common.actjs.init();
      this.$common.common.preLoading( "stressing" );

      this.$nextTick( function () {
        var clientH = document.documentElement.clientHeight;
        this.warp = {
          'height' : clientH + 'px',
          'width' : '100%',
          'background-color' : '#d5dde1',
          'background-size' : '100% 100%'
        }
        this.icon = {
          'height' : '12.166667rem',
          'width' : '17.233333rem',
          'background' : 'url(' + backimg + ') top left no-repeat',
          'background-size' : '100% 100%'
        }
        $('.warp').css( 'height', clientH + 'px' );
      })
    }
  }
</script>
<style lang="less" scoped>
.icon{
  position : absolute;
  top : 5rem;
  left : calc(~'50% - 17.23rem/2');
}
</style>