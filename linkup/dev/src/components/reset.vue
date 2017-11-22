<template>
  <div class="reset">
    <div class='pv' v-if='pvshow'>
      <p>{{pvnum}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'reset',
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
      },
      href: 'https://www.hxsapp.com/download',
      resetData : null,
      rebackData: null,
      pvshow: false,
      pvnum: '',
    }
  },
  props: {
    data: {
      type: [Object, String],
      default: ''
    },
  },
  mounted() {
    var _this = this
    this.init()

    this.$nextTick(function() {
      _this.pv()
      _this.shareFun()
    })
  },
  methods: {
    sendData(sendThing) {
      var _this = this
      this.$emit('reset', sendThing)
    },
    init() {
      var _this = this

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
      this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/actInfo', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            this.$common.actjs.shareFun(data.data.data);
            _this.actId = data.data.data.id
            _this.pageTitle = data.data.data.title
            document.title = data.data.data.title
          }
        })
    },
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
  },
  watch: {
    data: function() {
      this.sendData()
    },
  }
}
</script>

<style lang='less' scoped>
@import './../assets/common/reset.less';

.pv{
  top : 3.5rem !important;
}
</style>
