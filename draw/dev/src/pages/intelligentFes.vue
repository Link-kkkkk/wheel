<template>
  <div class="warp">
    <preload></preload>
    <div class="box_1">
      <div class="ruleBtn" @click='callRule'></div>
      <div class="pvBox">
        <p class="">{{joinNum}}人参加</p>
      </div>
    </div>
    <div class="box_2">
      <div class="panBorder" :style='rollpanBorderSpeed'></div>
      <div class="pan" :style='panSpeed'></div>
      <div class="drawBtn" @click="draw()"></div>
      <product class="productArea"></product>
    </div>
    <layer ref="layerRef"></layer>
    <foot></foot>
    <down downLink='href'></down>
    <share :actData='actData'></share>
  </div>
</template>
<script>
import layer from './../components/layer';
import foot from './../components/footNotice';
import down from './../components/down'
import preload from './../components/preload'
import product from './childrenPage/intelligentFes/buy'
import share from './../components/shareInfo'
import com from './../util/common'

export default {
  name: 'init',
  components: {
    layer,
    foot,
    down,
    preload,
    product,
    share
  },
  data() {
    return {
      json: {
        sess_token: com.$_GET('sess_token'),
        act_id: com.$_GET('id'),
        model_idfa: com.$_GET('model_idfa'),
      },
      actData: {
        act_id: com.$_GET('id')
      },
      href: 'https://www.hxsapp.com/download',
      pvshow: false,
      pvnum: 0,
      joinNum: 0,
      panRollDeg: 0,
      panSpeed: '',
      rolled: 0,
      rollpanBorderSpeed: {
        'animation': 'slowroll 60s infinite linear',
      },
      drawInName: '',
      drawInImg: '',

    }
  },
  mounted() {
    var _this = this
    // this.$common.actjs.resizeWindow();
    // this.$common.actjs.init(this.href);
    // this.$common.common.preLoading("stressing");

    this.$nextTick(() => {
      _this.pv()
    })

    window.appShareCallback = function() {
      _this.clearLayer()
    }
  },
  methods: {
    init() {

    },
    pv() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/base/Api/pv', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.joinNum = data.data.data.sum
          }
        })
    },
    callRule() {
      this.$refs.layerRef.callLayerRule();
    },
    // getInfo() {
    //   var _this = this
    //   this.$http.jsonp(_this.$common.common._ACTHOST + '/base/Api/actInfo', { params: _this.json })
    //     .then(function(data) {

    //     })
    // },
    draw() {
      var _this = this
      if (_this.$common.actjs.checklogin(_this.href) == false) {
        return false
      }
      this.rollPan()
    },
    rollPan(deg) {
      var _this = this
      var rolldeg = 2160
      this.$http.jsonp(_this.$common.common._ACTHOST + '/elevenIntelligence/Mod/draw', { params: _this.json })
        .then(function(data) {
          if (_this.rolled > 0) {
            return false
          }

          if (data.data.code == 200) {
            _this.drawInName = data.data.data.name
            _this.drawInImg = data.data.data.image
            _this.panRollDeg -= -(2160 - data.data.data.location)
            _this.panSpeed = {
              'transform': 'rotate(' + _this.panRollDeg + 'deg)'
            }
            _this.rolled++;
            let awardJson = {
              name: _this.drawInName,
              img: _this.drawInImg
            }
            setTimeout(function() {
              _this.$refs.layerRef.callLayerIn(awardJson)
              _this.rolled--
            }, 6000)
          } else if (data.data.code == 600) {
            _this.$refs.layerRef.callLayerOut()
          } else if (data.data.code == 607) {
            _this.panRollDeg -= -(2160 - 270)
            _this.panSpeed = {
              'transform': 'rotate(' + _this.panRollDeg + 'deg)'
            }
            _this.rolled++;
            setTimeout(function() {
              _this.$refs.layerRef.callLayerNotin()
              _this.rolled--
            }, 6000)
          } else {
            com.toastTip(data.data.msg, 1500);
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
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
.warp {
  position: relative;
}

.box_1 {
  background: url('./../assets/img/intell/bg_1.jpg') left top no-repeat;
  .rback(100%,
  33.13rem);
}

.box_2 {
  background: url('./../assets/img/intell/bg_2.jpg') left top no-repeat;
  .rback(100%,
  35.13rem);
}

.ruleBtn {
  background: url('./../assets/img/intell/ruleBtn.png') left top no-repeat;
  .rback(6.766667rem,
  1.433333rem);
  position: absolute;
  top: 30.766667rem;
  left: 2rem;
}

.pvBox {
  position: absolute;
  top: 28.3rem;
  right: 2rem;
  p {
    color: #f8dcff;
    font-size: .8rem;
  }
}

.panBorder {
  background: url('./../assets/img/intell/panborder.png') left top no-repeat;
  .rback(17.5rem,
  17.5rem);
  .center(17.5rem);
  position: absolute;
  top: 2.666667rem;
}

.pan {
  background: url('./../assets/img/intell/pan.png') left top no-repeat;
  .rback(14.8rem,
  14.8rem);
  .center(14.7rem);
  position: absolute;
  top: 4.05rem;
  transition: transform 6s;
}

.drawBtn {
  background: url('./../assets/img/intell/drawBtn.png') left top no-repeat;
  .rback(5rem,
  6.3rem);
  .center(4.7rem);
  position: absolute;
  top: 8rem;
}

.shadow {
  background: url('./../assets/img/intell/shadow.png') left top no-repeat;
  .rback(11.666667rem,
  2.5rem);
  .center(11.66rem);
  position: absolute;
  top: 8rem;
}

.productArea {
  left: calc(~'50%' - 12rem);
}



/*animate*/

@keyframes slowroll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>

