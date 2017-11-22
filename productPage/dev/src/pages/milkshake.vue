<template>
  <div class="warp">
    <!-- <remote src='https://act.hxsapp.com/html/common/prism-min.js'></remote>
    <remote src='https://act.hxsapp.com/html/psychol/js/customPlayStyle.js'></remote> -->
    <div class="indexPage" v-show='indexLayer'>
      <div class='pv' v-if='pvshow'>
        <p>{{pvnum}}</p>
      </div>
      <div id="J_prismPlayer" class="prism-player"></div>
      <img v-for='(data,index) in imgArr' :src='imgArr[index]' class="imgBox" :key='index'>
      <div class="product_1" @click='goBuy("mangguo","芒果味奶昔")'>
        <div class="buyBtn"></div>
      </div>
      <div class="product_2" @click='goBuy("shanyao","山药味奶昔")'>
        <div class="buyBtn"></div>
      </div>
      <div class="product_3" @click='goBuy("xiangyu","香芋味奶昔")'>
        <div class="buyBtn"></div>
      </div>
      <div class="goMore" @click='showMore()'></div>
      <div class="finger"></div>
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
import img1 from '../assets/img/milkshake/bg_1.jpg'
import img2 from '../assets/img/milkshake/bg_2.jpg'
import img3 from '../assets/img/milkshake/bg_3.jpg'
import img4 from '../assets/img/milkshake/bg_4.jpg'
import img5 from '../assets/img/milkshake/bg_5.jpg'
import img6 from '../assets/img/milkshake/bg_6.jpg'

import down from './../components/down'
import preload from './../components/preload'
import bp from './../components/buriedPoint'
import remote from './../components/remote'

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
      proLayer: false,
      indexLayer: true,
      firstClick: true,
      imgArr: [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6
      ]
    }
  },
  components: {
    down,
    preload,
    bp,
    remote
  },
  mounted() {
    var _this = this
    // this.$common.actjs.resizeWindow();
    this.$common.actjs.init(this.href);
    // this.$common.common.preLoading("stressing");
    this.$nextTick(function() {
      _this.shareFun();//分享数据
      _this.player();
      jPrismPlayerStyle();
      remfix();
      if (_this.firstClick) {
        $('.prism-big-play-btn,.prism-play-btn').on('click', function() {
          setTimeout(() => {
            $('.prism-fullscreen-btn').trigger('click')
          }, 500)
        })
        _this.firstClick = false
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
    player() {
      var clickTrue = true;
      var playerHeight = $(window).width() * 0.5625 * 0.62;
      window.player = new prismplayer({
        id: 'J_prismPlayer',
        // source: 'https://act.hxsapp.com/html/psychol/img/milk.mp4',
        source: 'http://hxsapp-media-out-oss.hxsapp.com/hxs-ss-m3u8-ld/video_1505800790.m3u8',
        autoplay: false,
        width: '62%',
        playsinline: true,
        showBuffer: true,
        height: playerHeight + 'px',
        cover: require('./../assets/img/milkshake/videoBg.jpg')
      });
    },
    goBuy(id, name) {
      var _this = this
      var Version = _this.$common.common.getHsxAppVersion();
      var productHref = 'https://app.hxsapp.com/html/mall/index.html#/shop/' + id;
      var outHref = 'https://app.hxsapp.com/html/mall/index.html?from=singlemessage&isappinstalled=1#/shop/' + id;
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
      // $('html,body').animate({ scrollTop: 0 }, 200);
      // this.proLayer = true
      // this.indexLayer = false
      var _this = this
      this.$router.push({
        name: 'milkDetail',
        params: {
          json: _this.json
        }
      })
      $('html,body').animate({ scrollTop: 0 }, 200)
    },
    clearLayer() {
      $('html,body').animate({ scrollTop: 0 }, 200);
      this.layerblack = false
      this.proLayer = false
      this.indexLayer = true
    }
  },
}

function jPrismPlayerStyle(obj) {
  $('.playerDiv_none').css({
    height: playerHeight,
    display: 'block'
  });

  $('.prism-play-btn').css({
    'float': 'left',
    'margin-left': '10px',
    'margin-right': '8px',
    'margin-top': '20px'
  });

  $('.new-prism-play-btn').css({
    'width': '35px',
    'height': '35px',
    'position': 'absolute',
    'left': '12px',
    'margin-right': '10px',
    'top': '15px'
  });

  $('.prism-play-btn.playing').css({
    'float': 'left',
    'margin-left': '10px',
    'margin-right': '8px',
    'margin-top': '20px'
  });

  $('.prism-time-display').css({
    'float': 'left',
    'margin-left': '0',
    'margin-top': '15px',
    'font-size': '12px'
  });

  $('.prism-fullscreen-btn').css({
    'float': 'right',
    'margin-right': '11px',
    'margin-left': '11px',
    'margin-top': '21px'
  });

  $('.prism-big-play-btn').css({
    left: '50%',
    top: '50%',
    bottom: 'auto',
    'margin-left': '-30px',
    'margin-top': '-30px'
  });

  var playerHeight = $(window).width() * 0.5625;
  var prismTimeWidth = $(window).width() * 0.62 - ($('.prism-play-btn').width() + 12 + 10) - ($('.prism-fullscreen-btn').width() + 11 + 11);
  prismTimeWidth = prismTimeWidth;
  $('.prism-time-display').css({
    width: prismTimeWidth
  });
  $('.playerDiv_none').css({
    height: playerHeight
  });

  var prismControlbarWidth = $('.prism-time-display').width() - (30 + 7 + 30 + 7 + 2);
  prismControlbarWidth = prismControlbarWidth;
  $('.prism-progress').css({
    width: prismControlbarWidth
  });

  $('.prism-player .prism-progress').css({
    left: ($('.prism-play-btn').width() + 12 + 10 + 39 - 4),
    top: '29px'
  });

  $('.time-bound').html('');
  $('.time-bound').css({
    display: 'none'
  });

}

function remfix() {
  var worldW = document.body.clientWidth;
  var re = worldW / 25

  $('#J_prismPlayer').css({
    'top': re * 41.433333 + 'px',
    'left': re * 4 + 'px'
  })
  $('.product_1').css({
    'bottom': re * 34.83 + 'px'
  })
  $('.product_2').css({
    'bottom': re * 21.23 + 'px'
  })
  $('.product_3').css({
    'bottom': re * 7.66 + 'px'
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

function netWorkState(State) {
  if (State == 'other') {
    $('.netWork').show();
  } else {
    $('.new-prism-play-btn').hide();
    player.play();
    $('.prism-player .prism-fullscreen-btn').show();
    if (clickTrue && !type) {
      $('#J_prismPlayer,.jPlayer').attr('state', '1');
      $.getJSON(_HOST + '/base/media/incrMediaPlay?callback=?', playerJson, function(data) { });
      clickTrue = false;
    }
  }
}

function netWorkPlay(moreMyUserAgent, player, playerHeight, playerJson, clickTrue, type) {
  moreMyUserAgent(function(Version) {
    if (Version >= 2.8 && Version) {
      $('.prism-controlbar').append('<a href="javascript" class="new-prism-play-btn"></a>');
      $('.network-tip').css('height', playerHeight);

      $('.new-prism-play-btn').click(function() {
        setTimeout(function() {
          window.location.href = 'https://hxsapp_get_network_state';
        }, 30);
        window.location.href = 'https://hxsapp_set_audio_info#pause';
      });

      $('.network-tip').click(function() {
        $('.new-prism-play-btn').hide();
        $('.prism-player .prism-fullscreen-btn').show();
        $('.netWork').hide();
        player.play();
      });
    }
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
