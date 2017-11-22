<template>
  <div>
    <transition name='fade'>
      <div class='layerBack' v-show='layerback' @click='clearLayer'></div>
    </transition>

    <transition name='layerAni'>
      <div class='layerRule' v-show='layerRule' @click='clearLayer'>
        <div class="ruleDetail">
          <p>1. 10月29日-10月30日注册用户可参与抽奖活动；</p>
          <p>2、获奖奖品在“我的福利”中查看，工作人员在活动结束后3个工作日内短信联系获奖者收集收件地址并寄出（力美健俱乐部现场兑换奖品用户不再重复发放）;</p>
          <p>3、新老用户可获得“79元体验价购买体脂秤”特权；</p>
          <p>4、分享活动到朋友圈中奖概率翻倍哦！</p>
        </div>
        <div class="close" @click="clearLayer"></div>
      </div>
    </transition>

    <transition name='layerAni'>
      <div class='layerDrawIn' v-show='layerDrawIn'>
        <div class="close" @click="clearLayer"></div>
        <p>{{bounsName}}</p>
        <div class="bouns" :style='bounsImg'></div>
        <div class="btn" @click="clearLayer"></div>
      </div>
    </transition>

    <transition name='layerAni'>
      <div class='layerDrawNotin' v-show='layerDrawNotin'>
        <div class="close" @click="clearLayer"></div>
        <div class="btn" @click="clearLayer"></div>
      </div>
    </transition>

    <transition name='layerAni'>
      <div class='layerDrawOut' v-show='layerDrawOut'>
        <div class="close" @click="clearLayer"></div>
        <div class="btn" @click="clearLayer"></div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'layer',
  data() {
    return {
      layerback: false,

      layerRule: false,
      layerDrawIn: false,
      layerDrawNotin: false,
      layerDrawOut: false,
      bounsName: '',
      bounsImg: {
        'background': ''
      }
    }
  },
  props: {
    layerType: {
      type: [Boolean, String],
      default: '未传入layerType'
    },
    bounsInfo: {
      type: [Object, String],
      default: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.appShareCallback = function() {
        _this.clearLayer()
      }
    })
  },
  methods: {
    clearLayer() {
      this.layerback = false

      this.layerRule = false
      this.layerDrawIn = false
      this.layerDrawNotin = false
      this.layerDrawOut = false
    },
    callLayerRule() {
      this.layerRule = true
      this.layerback = true
    },
    callLayerIn(bounsInfo) {
      console.log(bounsInfo)
      this.layerDrawIn = true
      this.layerback = true
    },
    callLayerNotin() {
      this.layerDrawNotin = true
      this.layerback = true
    },
    callLayerOut() {
      this.layerDrawOut = true
      this.layerback = true
    }
  },
  watch: {
    layerShow: function() {
      var _this = this
    },
    msg: function() {

    }
  }
}
</script>

<style lang='less' scoped>
@import './../assets/common/reset.less';

.layerRule {
  background: url('./../assets/img/intell/layerRule.png') left top no-repeat;
  .rback(21.1rem,
  20rem);
  .center(21.1rem);
  position: fixed;
  top: 13.8rem;
  .ruleDetail {
    padding: 4.8rem 10px 0 10px;
    p {
      font-size: .866667rem;
      line-height: 1.4rem;
    }
  }
}

.layerDrawIn {
  background: url('./../assets/img/intell/drawIn.png') left top no-repeat;
  .rback(16.5rem,
  19.5rem);
  .center(16.5rem);
  position: fixed;
  top: 13.8rem;
  p {
    color: #ed1f86;
    font-size: 1.2rem;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 8.733333rem;
  }
  .bouns {
    width: 7.4rem;
    height: 4.833333rem;
    background-size: 100% 100%;
    position: absolute;
    .center(7.4rem);
    top: 10.5rem;
  }
  .btn{
    background: url('./../assets/img/intell/btn_2.png') left top no-repeat;
    .rback(7.333333rem,
    1.833333rem);
    .center(7.3rem);
    position: absolute;
    bottom: 1.833333rem;
  }
}

.layerDrawNotin {
  background: url('./../assets/img/intell/drawNotin.png') left top no-repeat;
  .rback(16.5rem,
  16rem);
  .center(16.5rem);
  position: fixed;
  top: 13.8rem;
  .btn {
    background: url('./../assets/img/intell/btn.png') left top no-repeat;
    .rback(14.366667rem,
    2.4rem);
    .center(14.366rem);
    position: absolute;
    bottom: 1.833333rem;
  }
}

.layerDrawOut {
  background: url('./../assets/img/intell/drawOut.png') left top no-repeat;
  .rback(16.5rem,
  16rem);
  .center(16.5rem);
  position: fixed;
  top: 13.8rem;
  .btn {
    background: url('./../assets/img/intell/btn.png') left top no-repeat;
    .rback(14.366667rem,
    2.4rem);
    .center(14.366rem);
    position: absolute;
    bottom: 1.833333rem;
  }
}

.close {
  background: url('./../assets/img/intell/close.png') left top no-repeat;
  .rback(1.4rem,
  1.4rem);
  position: absolute;
  right: -.7rem;
  top: -.7rem;
}

.layerBack {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .75);
}

.layerAni-enter-active {
  animation-name: bounceInDown;
  animation-duration: .8s;
}

.layerAni-leave-active {
  animation-name: bounceOutUp;
  animation-duration: .8s;
}
</style>