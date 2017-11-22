<template>
  <div class="warp">
    <div class='pv' v-if='pvshow'>
      <p>{{pvnum}}</p>
    </div>
    <div class="box_1">
      <div class='dateBox'>
        <p>{{acttime}}</p>
      </div>
    </div>
    <div class="box_2">
      <div :class='Tic_1_Style'></div>
      <div :class="BtnStyle" @click='get(1)'></div>
    </div>
    <div class="box_3">
      <div :class='Tic_2_Style'></div>
      <div class="getBtn_2" @click='get(3)'></div>
    </div>
    <div class="box_4"></div>
    <div class="box_5">
      <div class="rankBtn" @click='showRank()'></div>
    </div>

    <transition name='down'>
      <div class="rankArea" v-show="rank">
        <div class='close_2' @click='clearLayer'></div>
        <div class="rankTit">
          <div class="rankClose"></div>
        </div>
        <ul class="rankList">
          <li class='rankline' v-for='(data,index) in rankNameArr' :key='index'>
            <div class="rankName">
              <p class="rankNameNum">
                <span :style='paddingT[index]'>{{index + 1}}</span>
              </p>
              <p class="rankNameNick">{{rankNameArr[index]}}</p>
            </div>
            <p class="rankFlow">{{rankFlowArr[index]}}</p>
            <p class="rankTime">{{rankTimeArr[index]}}</p>
          </li>
          <div class="rankBot"></div>
        </ul>
      </div>
    </transition>
    <transition name='fade'>
      <div class='layerBack' v-show='layerblack'></div>
    </transition>
    <transition name='fade'>
      <div class='shareLayer' v-show='shareLayer' @click='clearLayer()'></div>
    </transition>
    <transition name='down'>
      <div class="ticbox_1" v-show='ticbox_1' @click='clearLayer ()'>
        <div class='close' @click='clearLayer'></div>
        <div class="ticBtn" @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='down'>
      <div class="ticbox_2" v-show='ticbox_2' @click='clearLayer ()'>
        <div class='close' @click='clearLayer'></div>
        <div class="ticBtn2" @click='clearLayer'></div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'init',
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
      },
      pageTitle: '',
      href: 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=108',
      pvshow: false,
      pvnum: 0,
      acttime: '',
      rank: false,
      ticbox_1: false,
      ticbox_2: false,
      layerBack: false,
      layerblack: false,
      shareLayer: false,
      geted: false,
      rankNameArr: [],
      rankFlowArr: [],
      rankTimeArr: [],
      paddingT: [],
      loading: false,
      BtnStyle: {
        'getBtn_1': true,
        'getBtn_1_ed': false
      },
      Tic_1_Style: {
        'tic_1': true,
        'tic_1_ed': false
      },
      Tic_2_Style: {
        'tic_2': true,
        'tic_2_ed': false
      },
      disBtn_1: false
    }
  },
  mounted() {
    var _this = this
    this.$common.actjs.resizeWindow();
    this.$common.actjs.init();
    this.$common.common.preLoading("stressing");
    //this.mock();

    var h = document.documentElement.clientHeight
    var tith = $('.rankTit').css('height')
    $('.warp,.rankArea').css('height', h + 'px')
    $('.rankList').css('height', (h - tith.slice(0, 3)) + 'px')

    window.appShareCallback = function(type) {
      var json_2 = {
        'sess_token': _this.json.sess_token,
        'act_id': _this.json.act_id,
        'model_idfa': _this.json.model_idfa,
        'type': 2
      }
      _this.$http.jsonp(_this.$common.common._ACTHOST + '/surpriseFlowSend/Mod/getUserTypeTwoReceive', { params: json_2 })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.bindTicTwo()
          }
        })
      // _this.checkTic(2)
      _this.layerblack = false
      _this.shareLayer = false
    }
    this.$nextTick(function() {
      _this.pv()
      _this.shareFun()
      _this.checkTic()
      _this.getRank()
      _this.garbageTimer()
      // _this.remfix()
    })
  },
  methods: {
    shareFun() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/surpriseFlowSend/Mod/actInfo', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            this.$common.actjs.shareFun(data.data.data);
            _this.actId = data.data.data.id
            _this.pageTitle = data.data.data.title
            document.title = data.data.data.title
            if (parseInt(data.data.data.start_time.slice(5, 7)) > 9) {
              var startMonth = 5
            } else {
              var startMonth = 6
            }
            var start = data.data.data.start_time.slice(startMonth, 7) + '月' + data.data.data.start_time.slice(8, 10) + '日'
            var end = data.data.data.end_time.slice(8, 10) + '日'
            _this.acttime = '活动时间:' + start + '-' + end
          }
        })
    },
    pv() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/surpriseFlowSend/Mod/pv', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.pvshow = true
            _this.pvnum = data.data.data.sum + '人参加'
            _this.headPv = data.data.data.sum + '人参加'
          }
        })
    },
    garbageTimer() {
      var _this = this
      var Version = _this.$common.common.getHsxAppVersion();
      if (!(_this.$common.common.compareAppVersion(Version, "2.9.0") || Version == "2.9.0") && Version) {
        var timer = setInterval(function() {
          _this.checkTic(2)
        }, 3000)
        if (!_this.$common.common.$_GET('sess_token')) {
          clearInterval(timer)
        }
      }
    },
    checkTic(type) {
      var _this = this
      !type ? type = 3 : type = type;

      if (type == 1) {
        checkTic_1()
      } else if (type == 2) {
        checkTic_2()
      } else if (type == 3) {
        checkTic_1()
        checkTic_2()
      }
      function checkTic_1() {
        _this.$http.jsonp(_this.$common.common._ACTHOST + '/surpriseFlowSend/Mod/getUserTypeOneState', { params: _this.json })
          .then(function(data) {
            if (data.data.code == 200) {
              _this.bindTicOne()
            }
          })
      }
      function checkTic_2() {
        _this.$http.jsonp(_this.$common.common._ACTHOST + '/surpriseFlowSend/Mod/getUserTypeTwoState', { params: _this.json })
          .then(function(data) {
            if (data.data.code == 200) {
              _this.bindTicTwo()
              return
            }
            if (data.data.code == 201) {
              _this.get(2)
            }
          })
      }
    },
    get(type) {
      var _this = this
      if (this.$common.actjs.checklogin(this.href) == false) {
        return false
      }

      if (type == 1) {
        if (_this.disBtn_1) {
          _this.$common.common.toastTip('.toast_tip', '您今日已领取，明日再来！', 1500)
          return false
        }
        var json_1 = {
          'sess_token': _this.json.sess_token,
          'act_id': _this.json.act_id,
          'model_idfa': _this.json.model_idfa,
          'type': 1
        }
        if (_this.loading) { return }
        _this.loading = true
        _this.$http.jsonp(_this.$common.common._ACTHOST + '/surpriseFlowSend/Mod/getUserTypeOneReceive', { params: json_1 })
          .then(function(data) {
            if (data.data.code == 200) {
              _this.$common.common.buriedPoint('领取10M券', '领取10M券');
              _this.layerblack = true
              _this.ticbox_1 = true
              _this.bindTicOne()
            } else if (data.data.code == 203) {
              _this.layerblack = true
              _this.ticbox_2 = true
            } else {
              _this.$common.common.toastTip('.toast_tip', data.data.msg, 1500)
            }
            _this.loading = false
          })
      } else if (type == 2) {
        var json_2 = {
          'sess_token': _this.json.sess_token,
          'act_id': _this.json.act_id,
          'model_idfa': _this.json.model_idfa,
          'type': 2
        }
        if (_this.geted) {
          return
        }
        _this.$http.jsonp(_this.$common.common._ACTHOST + '/surpriseFlowSend/Mod/getUserTypeTwoReceive', { params: json_2 })
          .then(function(data) {
            if (data.data.code == 200) {
              _this.geted = true
            }
          })
      } else if (type == 3) {
        _this.layerblack = true
        _this.shareLayer = true
      }
    },
    bindTicOne() {
      var _this = this
      _this.BtnStyle = {
        'getBtn_1': false,
        'getBtn_1_ed': true
      }
      // _this.Tic_1_Style = {
      //   'tic_1': false,
      //   'tic_1_ed': true
      // }
      _this.disBtn_1 = true
    },
    bindTicTwo() {
      var _this = this
      _this.Tic_2_Style = {
        'tic_2': false,
        'tic_2_ed': true
      }
    },
    getRank() {
      var _this = this
      _this.$http.jsonp(_this.$common.common._ACTHOST + '/surpriseFlowSend/Mod/getFlowRankingList', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            for (var i = 0; i < data.data.data.length; i++) {
              _this.rankNameArr.push(_this.subStlength(data.data.data[i].nickname, 5, 5))
              _this.rankFlowArr.push(data.data.data[i].flow_total)
              _this.rankTimeArr.push(data.data.data[i].share_hour_avg)
              if (i >= 9) {
                _this.paddingT.push({
                  'padding': '.15rem .3rem'
                })
              } else {
                _this.paddingT.push({
                  'padding': '0 .45rem'
                })
              }
            }
          }
        })
    },
    mock() {
      var _this = this
      var Mock = require('mockjs')
      var mockData = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        "data": {
          'name|30': ["@cname(2,5)"],
          'flow|30': ["@integer(50, 100)M"],
          'time|30': ['@date("HH:mm")']
        }
      })
      _this.rankNameArr = mockData.data.name
      _this.rankFlowArr = mockData.data.flow
      _this.rankTimeArr = mockData.data.time
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
    showRank() {
      $('.rankList').animate({ scrollTop: 0 }, 100);
      this.rank = true
    },
    clearLayer() {
      this.rank = false
      this.layerblack = false
      this.ticbox_1 = false
      this.ticbox_2 = false
      this.shareLayer = false
    },
    remfix() {
      var worldW = document.body.clientWidth;
      var re = worldW / 25
      $('.getBtn_1').css({
        'top': 17.333333 * re + 'px',
      })
      $('.getBtn_1,.getBtn_2,getBtn_1_ed').css({
        'width': 19.6 * re + 'px',
        'height': 3.433333 * re + 'px',
        'left': 2.7 * re + 'px',
        'top': 17.333333 * re + 'px',
      })
      $('.close_2').css({
        'top': 1.2 * re + 'px',
        'right': 1.2 * re + 'px',
      })
    },
  },
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
@import './../assets/common/flowPacket/index.less';
</style>

