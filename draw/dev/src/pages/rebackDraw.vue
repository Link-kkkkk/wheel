<template>
  <div class="warp">
    <div class='pv' v-if='pvshow'>
      <p>{{pvnum}}</p>
    </div>
    <down downLink='href'></down>
    <div class="actTime" v-if='false'>活动时间:{{acttime}}</div>

    <ul class="drawArea">
      <li :class="giftBgArr[index]" v-for='(data,index) in giftArr' :style='switchBack' :key="index">
        <div :class='giftImg[index]' @click='draw(index)'></div>
      </li>
    </ul>
    <ul class="winList">
      <li class="winner" v-for='(data,index) in winNameArr' :class="{lineBg:singerBg[index]}" :key="index">
        <p>恭喜{{winNameArr[index]}}</p>
        <p>抽中</p>
        <p>{{winGiftArr[index]}}</p>
      </li>
    </ul>
    <div class="ruleBtn" @click="showRule"></div>
    <p class="notice"></p>
    <transition name='fade'>
      <div class='layerBack' v-show='layerblack'></div>
    </transition>
    <transition name='down'>
      <div class='ruleBox' v-show='ruleLayer'>
        <div class="close" @click="clearLayer"></div>
        <div class="ruleDetail">
          <div class="ruleDetailBox">
            <p>1.活动时间：{{ruleActtime}}</p>
            <p>2.新用户可直接抽奖，老用户转发分享即可获得抽奖机会。</p>
            <p>3.活动期间，用户每天只有一次抽奖机会。</p>
            <p>4.实物奖：工作人员在活动结束后3个工作日内以电话形式与中奖者联系确认，确认信息后3个工作日内邮寄。</p>
            <p>5.虚拟奖品：次日充值到账，以短信形式通知，请注意查看短信。</p>
          </div>
        </div>
      </div>
    </transition>
    <transition name='down'>
      <div class='inLayer' v-show='inLayer'>
        <p class="rewardNotice">{{giftName}}</p>
        <div class="rewardImgBox">
          <img :src="rewardImg" />
        </div>
        <div class="close" @click="clearLayer"></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='notinLayer' v-show='notinLayer'>
        <div class="notBtn" @click="clearLayer"></div>
        <div class="close" @click="clearLayer"></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='shareLayer' v-show='shareLayer'>
        <div class="shareBtn" @click="showShareFix"></div>
        <div class="close_2" @click="clearLayer"></div>
      </div>
    </transition>
    <transition name='fade'>
      <div class='shareLayer_2' v-show='shareLayer_2' @click="clearLayer">
      </div>
    </transition>
    <localmock :dataToMock='null' @listenMock='__mockListen'></localmock>
    <preload></preload>
  </div>
</template>
<script>
import layer from './../components/layer';
import localmock from './../components/mock';
import preload from './../components/preload';
import down from './../components/down'

export default {
  name: 'init',
  components: {
    layer,
    localmock,
    preload,
    down
  },
  data() {
    return {
      val: 1,
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
      },
      buriedjson: {
        access_occurred_type: 110102,//发生访问的【页面】类型
        access_occurred_type_id: this.$common.common.$_GET('id'),//发生访问的【页面】类型ID
        previous_event_type_obj: '',//【事件】对象类型
        previous_event_type_obj_id: '',//【事件】对象类型ID
        previous_content_sort: ''//【事件】事件参数
      },
      pageTitle: '',
      href: 'https://www.hxsapp.com/download',
      acttime: '',
      ruleActtime: '',
      pvshow: false,
      pvnum: 0,
      layerblack: false,
      ruleLayer: false,
      inLayer: false,
      notinLayer: false,
      shareLayer: false,
      shareLayer_2: false,
      giftArr: [1, 1, 1, 1, 1, 1, 1, 1, 1],
      times: 0,//旋转次数
      cycle: 60,//旋转基本次数
      prize: 1,//奖品id
      index: 7,//当前转到哪个位置
      speed: 150,//初始转动速度
      count: 8,//总共有多少个位置
      click: true,//是否可点击
      code: 0,//停止状态码
      rolled: 0,
      giftBgArr: [
        'gift',
        'gift',
        'gift',
        'gift',
        'gift',
        'gift',
        'gift',
        'gift',
        'gift'
      ],
      giftImg: [
        { 'gift_1': true, 'gift': true, 'drawBtn': false, 'lotery1': true },
        { 'gift_2': true, 'gift': true, 'drawBtn': false, 'lotery2': true },
        { 'gift_3': true, 'gift': true, 'drawBtn': false, 'lotery3': true },
        { 'gift_4': true, 'gift': true, 'drawBtn': false, 'lotery8': true },
        { 'gift_5': false, 'gift': false, 'drawBtn': true },
        { 'gift_6': true, 'gift': true, 'drawBtn': false, 'lotery4': true },
        { 'gift_7': true, 'gift': true, 'drawBtn': false, 'lotery7': true },
        { 'gift_8': true, 'gift': true, 'drawBtn': false, 'lotery6': true },
        { 'gift_9': true, 'gift': true, 'drawBtn': false, 'lotery5': true }
      ],
      switchBack: '',
      winNameArr: [],
      winGiftArr: [],
      giftName: '',
      rewardImg: '',
      msgToLayerback: '',
      getIn: true,
      singerBg: []
    }
  },
  mounted() {
    var _this = this
    this.$common.actjs.resizeWindow();
    this.$common.actjs.init(this.href);
    // this.$common.common.preLoading("stressing");

    this.$nextTick(() => {
      _this.pv()
      _this.shareFun()
      _this.getWinner()
      _this.channelHref()

      _this.$common.common.buriedPoint()
      // _this.$common.common.newburiedPoint(_this.buriedjson)
    })

    window.appShareCallback = function() {
      _this.clearLayer()
    }
  },
  methods: {
    init() {

    },
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
      this.$http.jsonp(_this.$common.common._ACTHOST + '/feedbackGift/Mod/actInfo', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.actId = data.data.data.id
            _this.pageTitle = data.data.data.title
            document.title = data.data.data.title
            _this.ruleActtime = getActTime(data.data.data.start_time, data.data.data.end_time)

            window.hxsapp_visible_share_btn_mar = function() {
              // _this.$common.common.newburiedPoint(_this.buriedjson)
            }
            this.$common.actjs.shareFun(data.data.data);
          }
        })
      function getActTime(start, end, con) {
        var startFirst = start.slice(5, 7)
        var startLast = start.slice(8, 10)
        var endFirst = end.slice(5, 7)
        var endLast = end.slice(8, 10)
        if (parseInt(startFirst) < 10) {
          startFirst = start.slice(6, 7)
        }
        if (parseInt(endFirst) < 10) {
          endFirst = end.slice(6, 7)
        }
        if (!con) { con = '-' }
        var startTime = startFirst + '月' + startLast + '日'
        var endTime = endFirst + '月' + endLast + '日'
        var acttime = startTime + con + endTime
        return acttime
      }
    },
    pv() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/feedbackGift/Mod/pv', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.pvshow = true
            _this.pvnum = data.data.data.sum + '人参加'
            // _this.headPv = data.data.data.sum + '人参加'
          }
        })
    },
    buried(access_occurred_type) {
      var __article_id = this.json.sess_token

      // _this.$common.common.newburiedPoint({
      //   access_occurred_type: access_occurred_type,//发生访问的【页面】类型
      //   access_occurred_type_id: __article_id,//发生访问的【页面】类型ID
      //   previous_event_type_obj: '',//【事件】对象类型
      //   previous_event_type_obj_id: '',//【事件】对象类型ID
      //   previous_content_sort: ''//【事件】事件参数
      // });
    },
    showIn() {
      this.inLayer = true
      this.layerblack = true
    },
    showNotin() {
      this.notinLayer = true
      this.layerblack = true
    },
    showShare() {
      this.shareLayer = true
      this.layerblack = true
    },
    showShareFix() {
      this.shareLayer = false
      this.shareLayer_2 = true
      this.layerblack = true
    },
    showRule() {
      this.ruleLayer = true
      this.layerblack = true
    },
    clearLayer() {
      this.ruleLayer = false
      this.layerblack = false
      this.inLayer = false
      this.notinLayer = false
      this.shareLayer = false
      this.shareLayer_2 = false
    },
    draw(tar) {
      var _this = this
      if (tar != 4) { return }
      if (_this.$common.actjs.checklogin(_this.href) == false) {
        return false
      }
      // if (this.rolled>0) {
      //   return
      // }else{
      //   this.rolled++
      // }
      // _this.$common.common.buriedPoint('抽取奖品', '抽取奖品');
      this.$http.jsonp(_this.$common.common._ACTHOST + '/feedbackGift/Mod/draw', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.getIn = true
            _this.giftName = data.data.data.name
            _this.rewardImg = data.data.data.image
            _this.prize = data.data.data.location
            _this.rotateFun()
          } else if (data.data.code == 607) {
            _this.getIn = false
            _this.prize = 8
            _this.rotateFun()
          } else if (data.data.code == 608) {
            _this.showShare()
          } else {
            _this.$common.common.toastTip('.toast_tip', data.data.msg, 1500)
          }
        })
    },
    rotateFun: function() {
      var _this = this;
      _this.times++;
      _this.roll();
      if (_this.times > _this.cycle + 10 && _this.prize == _this.index) {
        clearTimeout();
        _this.speed = 150;
        _this.times = 0;
        _this.rolled++;
        setTimeout(function() {
          _this.stop();
        }, 1000)
        return;
      } else {
        if (_this.times < _this.cycle) {
          _this.speed -= 5;
        }
        else {
          if (_this.times > _this.cycle + 10 && (_this.prize == 0 && _this.index == 7 || _this.prize == _this.index + 1)) {
            _this.speed += 40;
          } else {
            _this.speed += 20;
          }
        }
      }
      if (_this.speed < 40) {
        _this.speed = 40;
      }
      setTimeout(_this.rotateFun, _this.speed);
    },
    roll: function() {
      var index = this.index;
      var count = this.count;
      $('.lotery' + index).parent().removeClass('checked');
      index++;
      if (index > count) {
        index = 1;
      };
      $('.lotery' + index).parent().addClass('checked');
      this.index = index;
    },
    stop() {
      var _this = this
      if (_this.getIn) {
        this.showIn()
      } else {
        this.showNotin()
      };
    },
    getWinner() {
      var _this = this
      var h = $('.winner').outerHeight()
      var _this = this

      this.$http.jsonp(_this.$common.common._ACTHOST + '/feedbackGift/Mod/winners', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            var data = data.data.data
            for (var i = 0; i < data.length; i++) {
              _this.winNameArr.push(_this.subStlength(data[i].n, 4, 4))
              _this.winGiftArr.push(data[i].a)
            }
          }
          var Nlist = _this.winNameArr
          var Glist = _this.winGiftArr
          for (var i = 0; i < data.length; i++) {
            if (!(i % 2)) {
              _this.singerBg.push(true)
            } else {
              _this.singerBg.push(false)
            }
          }
          var timer = setInterval(function() {
            $('.winner').animate({ top: -$('.winner').outerHeight() + 'px' }, 1000);
            setTimeout(() => {
              Nlist = Nlist.concat(Nlist.splice(0, 1));
              Glist = Glist.concat(Glist.splice(0, 1));
              _this.winNameArr = Nlist;
              _this.winGiftArr = Glist
              $('.winner').css({ top: '' });
              for (var i = 0; i < _this.singerBg.length; i++) {
                _this.singerBg[i] = !_this.singerBg[i]
              }
            }, 1100)
          }, 3000)
          if (data.length < 5) {
            clearInterval(timer)
          }
        })
    },
    subStlength(str, maxLength, targetLength) {
      if (str) {
        var reg = /^[A-Za-z]+$/;
        var re = /^[0-9a-zA-Z]*$/g;
        if (reg.test(str) || re.test(str)) {
          if (str.length > 2 * maxLength) str = str.substring(0, 2 * targetLength) + '...';
        } else {
          if (str.length > maxLength) str = str.substring(0, targetLength) + '...';
        }
      }
      return str;
    },
    __mockListen(data) {
      var _this = this
      var mockData = data.data
      // _this.winNameArr = mockData.rebackName
      // _this.winGiftArr = mockData.rebackGift
    }
  },
  beforeDestroy() {
    delete window.hxsapp_visible_share_btn_mar;
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
@import './../assets/common/reback.less';
.ruleBox {
  .back(21.1rem, 20rem, './../img/rebackDraw/rule.png');
  .center(21.1rem);
  position: fixed;
  top: 12.5rem;
}

.ruleBox {
  background: url('./../assets/img/rebackDraw/rule.png') left top no-repeat;
  .rback(21.1rem,
  20rem);
  .center(21.1rem);
  position: fixed;
  top: 12.5rem;
  .ruleDetailBox {
    padding: 4.8rem 10px 0 10px;
    p {
      font-size: .866667rem;
      line-height: 1.4rem;
    }
  }
}
</style>

