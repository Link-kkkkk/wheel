<template>
  <div class="warp">
    <div class='pv' v-if='pvshow'>
      <p>{{pvnum}}</p>
    </div>
    <img v-for='(data,index) in firstImg' :src='firstImg[index]' class="imgBox" :key='index'>
    <img v-for='(data,index) in imgArr' v-lazy='imgArr[index]' class="imgBox" :key='index'>
    <div class="product_1" @click='goBuy("lanmei","蓝莓味奶昔")'>
      <div class="buyBtn"></div>
    </div>
    <div class="product_2" @click='goBuy("xiangcao","香草味奶昔")'>
      <div class="buyBtn"></div>
    </div>
    <transition name='fade'>
      <div class='layerBack' v-show='layerblack'></div>
    </transition>
    <down></down>
    <preload></preload>
    <bp></bp>
  </div>
</template>
<script>
import img1 from '../assets/img/mealPowder/bg_1.jpg'
import img2 from '../assets/img/mealPowder/bg_2.jpg'
import img3 from '../assets/img/mealPowder/bg_3.jpg'
import img4 from '../assets/img/mealPowder/bg_4.jpg'
import img5 from '../assets/img/mealPowder/bg_5.jpg'
import img6 from '../assets/img/mealPowder/bg_6.jpg'
import img7 from '../assets/img/mealPowder/bg_7.jpg'
import img8 from '../assets/img/mealPowder/bg_8.jpg'

import down from './../components/down'
import preload from './../components/preload'
import bp from './../components/buriedPoint'
export default {
  name: 'init',
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
        share_type: 'act_buy_mealPowder'
      },
      utime: this.$common.common.$_GET('utime'),
      sign: this.$common.common.$_GET('sign'),
      pageTitle: '',
      href: 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=108',
      propData: {
        position: '20rem'
      },
      windowToTop: 0,
      pvnum: '',
      pvshow: true,
      layerblack: false,
      proLayer: true,
      indexLayer: true,
      firstClick: true,
      firstImg: [
        img1,
        img2
      ],
      imgArr: [
        img3,
        img4,
        img5,
        img6,
        img7,
        img8
      ]
    }
  },
  components: {
    down,
    preload,
    bp
  },
  mounted() {
    var _this = this
    // this.$common.actjs.resizeWindow();
    this.$common.actjs.init(this.href);
    // this.$common.common.preLoading("stressing");

    this.$nextTick(function() {
      _this.shareFun();//分享数据
    })
  },
  methods: {
    channelHref() {
      var _this = this
      this.$nextTick(function() {
        var ua = window.navigator.userAgent;
        var IsAndroid = new RegExp('Android').test(ua);
        var isAndroidQQ = new RegExp('Mobile MQQBrowser').test(ua);
        var MicroMessenger = new RegExp('MicroMessenger').test(ua);
        var isIos = new RegExp('iPhone').test(ua);
        var isIpad = new RegExp('iPad').test(ua);
        var isIosQQ = new RegExp(' QQ/').test(ua);
        if (IsAndroid) {
          _this.noticeWord = '活动最终解释权归好享瘦APP所有'
        }
        this.href = ((IsAndroid && isAndroidQQ && !MicroMessenger) || (isIos && isIosQQ) || (isIpad && isIosQQ)) ? 'https://www.hxsapp.com/download' : this.href;
        $('.d_foot a').attr('href', this.href);
      })
    },
    shareFun() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/productAct/Mod/actInfo', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.actId = data.data.data.id
            _this.pageTitle = data.data.data.title
            document.title = data.data.data.title

            var thisHref = data.data.data.link + '&shareType=1&';
            this.$common.common.wxSecShare(data.data.data.title, data.data.data.descr, thisHref, data.data.data.images)
            this.$common.actjs.shareFun(data.data.data);

            _this.pvshow = true
            _this.pvnum = data.data.data.pv_sum + '人参加'
          }
        })
    },
    goBuy(id, name) {
      var _this = this
      var Version = _this.$common.common.getHsxAppVersion();
      var productHref = 'https://app.hxsapp.com/html/mall/index.html#/shop/' + id;
      var outHref = 'https://app.hxsapp.com/html/mall/index.html?from=singlemessage&isappinstalled=1#/shop/' + id;
      // var productHref = 'https://app.hxsapp.com/hxsweb/shopDetail/' + id;
      // var outHref = 'https://app.hxsapp.com/hxsweb/shopDetail/' + id;
      var userMess = '?sess_token=' + this.json.sess_token + '&utime=' + this.utime + '&sign=' + this.sign + '&'
      // _this.$common.common.buriedPoint('点击购买' + name, '点击购买' + name);

      if (this.$common.common.$_GET('shareType') == 1) {
        window.location.href = outHref
        return false
      } else {
        window.location.href = productHref + userMess
        // window.location.href = 'https://hxsapp_new_webview#' + productHref
      }
      // if ((!_this.$common.common.compareAppVersion(Version, "2.10.0")) && Version) {
      //   _this.$common.common.toastTip('.toast_tip', '更新到最新版本才能进行购买哦', 1500);
      //   return false;
      // }
      // if (Version == '0.0.0') {
      //   window.location.href = productHref + userMess
      // } else {
      //   window.location.href = productHref + userMess
      // }
    },
    showMore() {
      $('html,body').animate({ scrollTop: 0 }, 200);
      this.proLayer = true
      this.indexLayer = false
    },
    clearLayer() {
      $('html,body').animate({ scrollTop: 0 }, 200);
      this.layerblack = false
      this.proLayer = false
      this.indexLayer = true
    },
    backToMain() {
      $('html,body').animate({ scrollTop: 0 }, 200);
      var _this = this
      this.$router.go(-1)
    }
  }
}

</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
@import './../assets/common/mealPowder/index.less';
.warp {
  // padding-bottom: 1.5rem;
  min-width: 320px;
}
</style>
