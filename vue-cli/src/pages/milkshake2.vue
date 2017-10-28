<template>
  <div class="warp">
    <div class='moreProduct' v-show='proLayer'>
      <div class="productArea">
        <div class="productBox" v-for='(data,index) in productArr' @click='goBuy(productIdArr[index] , productNameArr[index])' :key='index'>
          <img :src='productArr[index]'>
          <div class="buyBtn_2"></div>
        </div>
      </div>
      <div class="backBox">
        <div class='backBtn' @click='backToMain'>返回上一页</div>
      </div>
    </div>
    <transition name='fade'>
      <div class='layerBack' v-show='layerblack'></div>
    </transition>
  </div>
</template>
<script>
// import product from '../components/milkPro'

import pro1 from '../assets/img/milkshake/pro_3.png'
import pro2 from '../assets/img/milkshake/pro_4.png'
import pro3 from '../assets/img/milkshake/pro_5.png'
import pro4 from '../assets/img/milkshake/pro_6.png'
import pro5 from '../assets/img/milkshake/pro_7.png'
import pro6 from '../assets/img/milkshake/pro_8.png'
import pro7 from '../assets/img/milkshake/pro_9.png'
import pro8 from '../assets/img/milkshake/pro_10.png'
import pro9 from '../assets/img/milkshake/pro_11.png'
import pro10 from '../assets/img/milkshake/pro_12.png'

export default {
  name: 'init',
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
        share_type: 'act_buy_milk'
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
      productArr: [
        pro1,
        pro2,
        pro3,
        pro4,
        pro5,
        pro6,
        pro7,
        pro8,
        pro9,
        pro10
      ],
      productIdArr: [
        'sanyecha',
        'heyecha',
        'damainenmiao',
        'lanmei',
        'xiangcao',
        'yishengjun',
        'jiangcha',
        'meiguiheye',
        'BodyCardio',
        'Bong'
      ],
      productNameArr: [
        '三叶茶',
        '荷叶茶',
        '大麦青汁',
        '蓝莓味代餐粉',
        '香草味代餐粉',
        '益生菌',
        '红糖姜茶',
        '玫瑰荷叶茶',
        '体脂秤',
        '智能手环'
      ],
    }
  },
  mounted() {
    var _this = this
    this.$common.actjs.resizeWindow();
    this.$common.actjs.init(this.href);
    this.$common.common.preLoading("stressing");

    this.$nextTick(function() {
      _this.shareFun();//分享数据
      // _this.pv();//pv数据
      remfix();

      if (_this.$route.params.json) {
        _this.json = _this.$route.params.json
      }
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
      var userMess = '?sess_token=' + this.json.sess_token + '&utime=' + this.utime + '&sign=' + this.sign + '&'
      _this.$common.common.buriedPoint('点击购买' + name, '点击购买' + name);

      if (this.$common.common.$_GET('shareType') == 1) {
        window.location.href = outHref
        return false
      }
      // if ((!_this.$common.common.compareAppVersion(Version, "2.10.0")) && Version) {
      //   _this.$common.common.toastTip('.toast_tip', '更新到最新版本才能进行购买哦', 1500);
      //   return false;
      // }
      if (Version == '0.0.0') {
        window.location.href = productHref
      } else {
        window.location.href = productHref + userMess
      }
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
  },
}

function remfix() {
  var worldW = document.body.clientWidth;
  var re = worldW / 25

  $('#J_prismPlayer').css({
    'top': re * 41.433333 + 'px',
    'left': re * 4 + 'px'
  })
  $('.product_1').css({
    'bottom': re * 20 + 'px'
  })
  $('.product_2').css({
    'bottom': re * 6 + 'px'
  })
  $('.product_1,.product_2').css({
    'width': re * 23.7666 + 'px',
    'height': re * 12.1333 + 'px',
    'left': re * .65 + 'px'
  })
  $('.productBox').css({
    'width': re * 11.7 + 'px',
    'height': re * 15.166667 + 'px',
    'margin-left': .5 * re + 'px',
    'margin-top': 1.6 * re + 'px'
  })
  $('.productBox img').css({
    'height': re * 15.066667 + 'px',
  })
  $('.buyBtn_2').css({
    'width': re * 4.1333 + 'px',
    'height': re * 1.4333 + 'px',
    'bottom': re * .4 + 'px',
    'right': re * .4 + 'px'
  })
}

</script>
<style scoped>
@import './../assets/common/milk/milk.css';
</style>
<style lang="less" scoped>
@import './../assets/common/reset.less';
@import './../assets/common/bodyCardio/index.less';
@import './../assets/common/milk/milkIndex.less';
.warp {
  // padding-bottom: 1.5rem;
  min-width: 320px;
}
</style>
