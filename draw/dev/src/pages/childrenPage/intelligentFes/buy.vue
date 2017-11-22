<template>
  <div class="buyWarp">
    <div class="btn" @click='goBuy'></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
      }
    }
  },
  props: {
    text: {
      type: [Object, String],
      default: ''
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.entry()
    })
  },
  methods: {
    entry() {

    },
    goBuy() {
      var _this = this
      var Version = _this.$common.common.getHsxAppVersion();
      _this.$common.common.buriedPoint('点击购买', '点击购买');
      if (this.$common.common.$_GET('shareType') == 1) {
        window.location.href = 'https://app.hxsapp.com/hxsweb/shopDetail/BodyCardio'
        return false
      }
      window.location.href = 'https://app.hxsapp.com/hxsweb/shopDetail/BodyCardio' + '?sess_token=' + this.json.sess_token + '&'
    }
  }
}

</script>

<style lang='less' scoped>
.buyWarp {
  background: url('../../../assets/img/intell/product.png') left top no-repeat;
  background-size: 100% 100%;
  width: 24rem;
  height: 10.666667rem;
  position: absolute;
  bottom: 25px;
  .btn {
    background: url('../../../assets/img/intell/productBtn.png') left top no-repeat;
    background-size: 100% 100%;
    width: 5.333333rem;
    height: 1.333333rem;
    position: absolute;
    top: 8rem;
    left: 2.166667rem;
  }
}
</style>
