<template>
  <div class="warp">
    <div class='pv' v-if='pvshow'><p>{{pvnum}}</p></div>
    <img v-for='(data,index) in HeadimgArr' :src='HeadimgArr[index]' :key="index">
    <img v-for='(data,index) in imgArr' v-lazy='imgArr[index]' :key="index">
    <div class="btn" @click="goBuy">立即购买</div>
    <share-info :act-data='actData'></share-info>
  </div>
</template>
<script>
import img1 from '../assets/img/bong/bg_1.jpg'
import img2 from '../assets/img/bong/bg_2.jpg'
import img3 from '../assets/img/bong/bg_3.jpg'
import img4 from '../assets/img/bong/bg_4.jpg'
import img5 from '../assets/img/bong/bg_5.jpg'
import img6 from '../assets/img/bong/bg_6.jpg'
import img7 from '../assets/img/bong/bg_7.jpg'
import img8 from '../assets/img/bong/bg_8.jpg'
import img9 from '../assets/img/bong/bg_9.jpg'
import img10 from '../assets/img/bong/bg_10.jpg'
import img11 from '../assets/img/bong/bg_11.jpg'
import img12 from '../assets/img/bong/bg_12.jpg'
import img13 from '../assets/img/bong/bg_13.jpg'

import shareInfo from '@/components/shareInfo.vue'

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
        HeadimgArr : [
          img1,
          img2,
          img3
        ],
        imgArr : [
          img4,
          img5,
          img6,
          img7,
          img8,
          img9,
          img10,
          img11,
          img12,
          img13
        ],
        actData: {
          act_id : ''
        },
      }
    },
    components: {
      shareInfo
    },
    mounted(){
      var _this = this
      this.$common.actjs.resizeWindow();
      this.$common.actjs.init(this.href);
      this.$common.common.preLoading( "stressing" );

      this.$nextTick( function () {
        _this.actData = _this.json
        // _this.shareFun();//分享数据
        _this.pv();//pv数据
      })
    },
    methods: {
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
      goBuy () {
        var _this = this
        var Version = _this.$common.common.getHsxAppVersion();
        _this.$common.common.buriedPoint('点击购买', '点击购买');
        if (this.$common.common.$_GET('shareType') == 1) {
          window.location.href = 'https://app.hxsapp.com/html/mall/index.html?from=singlemessage&isappinstalled=1#/shop/Bong'
          return false
        }
        // if ((!_this.$common.common.compareAppVersion(Version, "2.10.0")) && Version) {
        //   _this.$common.common.toastTip('.toast_tip', '更新到最新版本才能进行购买哦', 1500);
        //   return false;
        // }
        window.location.href = 'https://app.hxsapp.com/html/mall/index.html#/shop/Bong' + '?sess_token=' + this.json.sess_token + '&utime=' + this.utime + '&sign=' + this.sign + '&'
      },
    }
}
</script>
<style lang="less" scoped>
  @import './../assets/common/reset.less';
  @import './../assets/common/bodyCardio/index.less';
  .warp {
    padding-bottom: 1.5rem;
  }
</style>
