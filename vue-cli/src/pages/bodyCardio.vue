<template>
  <div class="warp">
    <div class='pv' v-if='pvshow'><p>{{pvnum}}</p></div>
    <img v-for='(data,index) in imgArr' :src='imgArr[index]'>
    <div class="btn" @click="goBuy" :style="btnStyle" v-show='btnshow'>立即购买</div>
  </div>
</template>
<script>
import img1 from '../assets/img/bodyCardio/bg_1.jpg'
import img2 from '../assets/img/bodyCardio/bg_2.jpg'
import img3 from '../assets/img/bodyCardio/bg_3.jpg'
import img4 from '../assets/img/bodyCardio/bg_4.jpg'
import img5 from '../assets/img/bodyCardio/bg_5.jpg'
import img6 from '../assets/img/bodyCardio/bg_6.jpg'
import img7 from '../assets/img/bodyCardio/bg_7.jpg'
import img8 from '../assets/img/bodyCardio/bg_8.jpg'
import img9 from '../assets/img/bodyCardio/bg_9.jpg'
import img10 from '../assets/img/bodyCardio/bg_10.jpg'

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
        href : 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=108',
        windowToTop : 0,
        btnshow : true,
        scrollEnd : true,
        pvnum : '',
        pvshow : true,
        btnStyle : {
          'opacity' : 1
        },
        imgArr : [img1,img2,img3,img4,img5,img6,img7,img8,img9,img10],
      }
    },
    mounted(){
      var _this = this
      this.$common.actjs.resizeWindow();
      this.$common.actjs.init(this.href);
      this.$common.common.preLoading( "stressing" );

      this.$nextTick( function () {
        _this.shareFun();//分享数据
        _this.pv();//pv数据
        // _this.scoll();
      })
    },
    methods: {
      channelHref () {
        var _this = this
        this.$nextTick( function () {
          var ua = window.navigator.userAgent;
          var IsAndroid = new RegExp('Android').test(ua);
          var isAndroidQQ = new RegExp('Mobile MQQBrowser').test(ua);
          var MicroMessenger = new RegExp('MicroMessenger').test(ua);
          var isIos = new RegExp('iPhone').test(ua);
          var isIpad = new RegExp('iPad').test(ua);
          var isIosQQ = new RegExp(' QQ/').test(ua);
          if(IsAndroid){
            _this.noticeWord = '活动最终解释权归好享瘦APP所有'
          }
          this.href = ((IsAndroid && isAndroidQQ && !MicroMessenger) || (isIos && isIosQQ) || (isIpad && isIosQQ)) ? 'https://www.hxsapp.com/download' : this.href;
          $('.d_foot a').attr( 'href', this.href );
        })
      },
      shareFun () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/buySteelyard/Mod/actInfo' , {params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              _this.actId = data.data.data.id
              _this.pageTitle = data.data.data.title
              document.title = data.data.data.title
              var thisHref = data.data.data.link + '&shareType=1&';
              this.$common.common.wxSecShare(data.data.data.title,data.data.data.descr,thisHref,data.data.data.images)
              this.$common.actjs.shareFun(data.data.data);
            }
          })
      },
      pv () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/buySteelyard/Mod/pv',{params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              _this.pvshow = true
              _this.pvnum = data.data.data.sum + '人参加'
            }
          })
      },
      scoll () {
        var _this = this
        $(window).on('scroll',function(){
          _this.btnshow = false

          if(_this.scrollEnd){
            setTimeout(function(){
              _this.btnshow = true
              _this.scrollEnd = true
            },1000)
          }
        })
      },
      goBuy () {
        var _this = this
        var Version = _this.$common.common.getHsxAppVersion();
        _this.$common.common.buriedPoint('点击购买', '点击购买');
        if (this.$common.common.$_GET('shareType') == 1) {
          window.location.href = 'https://app.hxsapp.com/html/mall/index.html?from=singlemessage&isappinstalled=1#/shop/BodyCardio'
          return false
        }
        // if ((!_this.$common.common.compareAppVersion(Version, "2.10.0")) && Version) {
        //   _this.$common.common.toastTip('.toast_tip', '更新到最新版本才能进行购买哦', 1500);
        //   return false;
        // }
        window.location.href = 'https://app.hxsapp.com/html/mall/index.html#/shop/BodyCardio' + '?sess_token=' + this.json.sess_token + '&utime=' + this.utime + '&sign=' + this.sign + '&'
      },
    }
}
</script>
<style lang="less" scoped>
  @import './../assets/common/reset.less';
  @import './../assets/common/bodyCardio/index.less';
</style>
