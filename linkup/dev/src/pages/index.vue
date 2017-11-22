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
        json : {
          sess_token: this.$common.common.$_GET('sess_token'),
          act_id: this.$common.common.$_GET('id'),
          model_idfa: this.$common.common.$_GET('model_idfa'),
        },
        utime : this.$common.common.$_GET('utime'),
        sign : this.$common.common.$_GET('sign'),
        pageTitle : '',
        warp : null,
        icon : null,
      }
    },
    mounted(){
      var _this = this

      this.$nextTick( function () {
        this.$common.common.preLoading( "stressing" );
        this.$common.actjs.resizeWindow();
        _this.routerGo ();
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
    },
    methods: {
      routerGo () {
        var _this = this
        switch(this.$common.common.$_GET('rute') || this.$route.params.rute){
          case 'game':
          _this.$router.push({ path: '/game' })
          break;
          case 'rank':
          _this.$router.push({ path: '/rank' })
          break;
          case 'olddraw':
          _this.$router.push({ path: '/olduserDraw' })
          break;
          case 'out':
          _this.$router.push({ path: '/out' })
          break;
        }
      },
    }
}
</script>
<style lang="less" scoped>
  @import './../assets/common/reset.less';
  .icon{
    position : absolute;
    top : 5rem;
    left : calc(~'50% - 17.23rem/2');
  }
</style>