<template>
  <div class="warp">
    <div class='pv' v-if='pvshow'>
      <p>{{pvnum}}</p>
    </div>
    <div class="shadow"></div>
    <div class="panBorder" :style='rollpanBorderSpeed'></div>
    <div class="pan" :style='panSpeed'></div>
    <div class="drawBtn" @click="draw()"></div>
    <!-- <button @click='backtoRank'>back to rank page</button> -->
    <!-- <button @click='goShow()'>go</button> -->
    <div class="rewardArea">
      <ul class="rewardBox">
        <li class="winner" v-for='(data,index) in winNameArr' :class="{rewardLineBg : singerBg[index]}" :key='index'>
          <p>恭喜{{winNameArr[index]}}</p>
          <p>抽中</p>
          <p>{{winGiftArr[index]}}</p>
        </li>
      </ul>
    </div>
    <transition name='fade'>
      <div class='layerBack' v-show='layerback'></div>
    </transition>
    <transition name='fade'>
      <div class='shareFrame' v-show='shareFrame' @click="clearLayer">

      </div>
    </transition>
    <transition name='down'>
      <div class='shareLayer' v-show='shareLayer'>
        <div class="shareBox">
          <div class="boxBtn" @click='showShareFrame'></div>
        </div>
        <div class="closeBtn_2" @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='inLayer' v-show='inLayer'>
        <div class="inBox">
          <p>{{drawInName}}</p>
          <div class="imgBox">
            <img :src='drawInImg'>
          </div>
          <div class="boxBtn" @click='goShow'></div>
        </div>
        <div class="closeBtn_2" @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='notLayer' v-show='notLayer'>
        <div class="notBox">
          <div class="boxBtn" @click='goPlay()'></div>
        </div>
        <div class="closeBtn_2" @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='edLayer' v-show='edLayer'>
        <div class="edBox">
          <div class="boxBtn" @click='goPlay()'></div>
        </div>
        <div class="closeBtn_2" @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='reLayer' v-show='reLayer'>
        <div class="reBox">
          <div class="boxBtn" @click='goPlay()'></div>
        </div>
        <div class="closeBtn_2" @click='clearLayer'></div>
      </div>
    </transition>
    <!-- <localmock :data='mockdataToMock' @listenMock='__mockListen'></localmock> -->
  </div>
</template>
<script>
import localmock from './../components/mock';

export default {
  name: 'init',
  components: {
    localmock
  },
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
        user_id: this.$common.common.$_GET('uu'),
      },
      href: 'https://www.hxsapp.com/download',
      rollpanBorderSpeed: {
        'animation': 'slowroll 60s infinite linear',
      },
      pvshow: false,
      pvnum: '',
      layerback: false,
      shareLayer: false,
      inLayer: false,
      notLayer: false,
      reLayer: false,
      edLayer: false,
      shareFrame: false,
      panRollDeg: 0,
      panSpeed: '',
      rolled: 0,
      mockdataToMock: null,
      winNameArr: [],
      winGiftArr: [],
      singerBg: [],
      drawInName: '',
      // drawInImg: require('./../assets/img/head_2.png'),
      drawInImg: '',
      sendData: '',
      userId: ''
    }
  },
  mounted() {
    var _this = this;
    this.$common.actjs.resizeWindow();
    this.$common.actjs.init(this.href);
    this.$common.common.preLoading("stressing");

    window.appShareCallback = function(type) {
      _this.layerblack = false
      _this.shareLayer = false
    }

    this.$nextTick(function() {
      var clientH = document.documentElement.clientHeight;
      $('html,body,.warp').css('height', clientH + 'px');

      if (_this.$parent.$data.json.id) {
        _this.json = _this.$parent.$data.json
      }

      this.getUserId()
      this.resetDraw()
      this.getWinnerList()
      this.share()
    })
  },
  methods: {
    pv() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/pv', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.pvshow = true
            _this.pvnum = data.data.data.sum + '人参加'
            // _this.headPv = data.data.data.sum + '人参加'
          }
        })
    },
    draw() {
      var _this = this
      if (_this.$common.actjs.checklogin(_this.href) == false) {
        return false
      }
      this.rollPan()
    },
    resetDraw() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/rsdts', { params: _this.json })
        .then(function(data) {

        })
    },
    rollPan(deg) {
      var _this = this
      var rolldeg = 2160
      this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/trigger', { params: _this.json })
        .then(function(data) {
          if (_this.rolled > 0) {
            return false
          }
          _this.$common.common.buriedPoint('点击抽奖', '点击抽奖');
          if (data.data.code == 200) {
            _this.drawInName = data.data.data.name
            _this.drawInImg = data.data.data.image
            _this.panRollDeg -= -(2160 - data.data.data.location)
            _this.panSpeed = {
              'transform': 'rotate(' + _this.panRollDeg + 'deg)'
            }
            _this.userId = data.data.data.u
            _this.rolled++;
            setTimeout(function() {
              _this.layerback = true
              _this.inLayer = true
              _this.rolled--
            }, 6000)
          } else if (data.data.code == 604) {
            _this.layerback = true
            _this.shareLayer = true
          } else if (data.data.code == 614) {
            _this.layerback = true
            _this.reLayer = true
          } else if (data.data.code == 607) {
            _this.panRollDeg -= -(2160 - 270)
            _this.panSpeed = {
              'transform': 'rotate(' + _this.panRollDeg + 'deg)'
            }
            _this.rolled++;
            setTimeout(function() {
              _this.layerback = true
              _this.notLayer = true
              _this.rolled--
            }, 6000)
          } else {
            _this.$common.common.toastTip('.toast_tip', data.data.msg, 1500);
          }
        })
    },
    getWinnerList() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/winners', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            for (var i = 0; i < data.data.data.length; i++) {
              _this.winNameArr.push(_this.subStlength(data.data.data[i].n, 4, 4))
              _this.winGiftArr.push(data.data.data[i].a)
            }

            var Nlist = _this.winNameArr
            var Glist = _this.winGiftArr
            for (var i = 0; i < Nlist.length; i++) {
              if (!(i % 2)) {
                _this.singerBg.push(true)
              } else {
                _this.singerBg.push(false)
              }
            }

            if (data.data.data.length < 6) {
              clearInterval(timer)
            }
            var timer;
            timer = setInterval(function() {
              $('.winner').animate({ top: -$('.winner').outerHeight() + 'px' }, 1000);
              setTimeout(() => {
                for (var i = 0; i < _this.singerBg.length; i++) {
                  _this.singerBg[i] = !_this.singerBg[i]
                }
                Nlist = Nlist.concat(Nlist.splice(0, 1));
                Glist = Glist.concat(Glist.splice(0, 1));
                _this.winNameArr = Nlist;
                _this.winGiftArr = Glist
                $('.winner').css({ top: '' });
              }, 1050)
            }, 3000)
          }
        })
    },
    share() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/actInfo', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            this.$common.actjs.shareFun(data.data.data, _this.$common.common._ACTHOST + '/html/linkup/dist/index.html?rute=game&id=' + _this.json.act_id);
            _this.pageTitle = data.data.data.title
            document.title = data.data.data.title
          }
        })
    },
    getUserId() {
      var _this = this
      //灌注user信息
      this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/getUserHeadImg', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.userId = data.data.data.user_id
            _this.$parent.$data.userGift = data.data.data.award_name
            _this.$parent.$data.userGiftUrl = data.data.data.award_image
            _this.$parent.$data.userHeadImg = data.data.data.head_img
            _this.$parent.$data.userName = data.data.data.nickname
          }
        })
    },
    goShow() {
      var _this = this
      this.$router.replace({
        name: 'out',
        params: {
          data: _this.json,
          rolled: _this.rolled,
          uu: _this.userId
        },
        query: {
          sess_token: _this.json.sess_token,
          id: _this.json.act_id
        }
      })
    },
    goPlay() {
      var _this = this
      _this.$parent.$data.json = _this.json
      this.$router.replace({
        name: 'game',
        params: {
          data: _this.json,
          backTo: true
        },
        query: {
          sess_token: _this.json.sess_token,
          id: _this.json.act_id
        }
      })
    },
    showShareFrame() {
      this.shareLayer = false
      this.shareFrame = true
    },
    clearLayer() {
      this.layerback = false
      this.shareLayer = false
      this.inLayer = false
      this.notLayer = false
      this.reLayer = false
      this.edLayer = false
      this.shareFrame = false
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
      _this.winNameArr = mockData.rebackName
      _this.winGiftArr = mockData.rebackGift
    }
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
@import './../assets/common/olddraw.less';
</style>
