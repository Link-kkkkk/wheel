<template>
  <div class='warp'>
    <div class='pv' v-if='pvshow'><p>{{pvnum}}</p></div>
    <div class='warpbox'>
      <div class='rulebtn' @click='showRuleLayer'></div>
      <div :class='mainTic' v-if='tic_1'>
        <div :class='getBtn' @click='getTic(1)'></div>
      </div>
      <div class='typeBox'>
        <div :class='sType'>
          <div class='sticBtn' @click='gobouns(0)'></div>
        </div>
        <div :class='bType'>
          <div class='bticBtn' @click='gobouns(1)'></div>
        </div>
      </div>
    </div>

    <!-- <div class='nocite' v-html='noticeWord'></div> -->
    <transition name='fade'>
      <div class='layerBack' v-show='layerblack'></div>
    </transition>
    <transition name='fade'>
      <div class='shareLayer' v-show='shareLayer' @click='clearLayer'></div>
    </transition>
    <transition name='down'>
      <div class='ruleBox' v-show='ruleLayer'>
        <div class='close' @click='clearLayer'></div>
        <div class='ruleText'>
          <p>1.每个用户10元季度券只可领取一次</p>
          <p>2.分享活动邀请好友来参加即可额外再领取爱奇艺50元年度券</p>
          <p>3.领取的爱奇艺券可在爱奇艺官网和APP端使用购买会员</p>
        </div>
      </div>
    </transition>
    <transition name='bounce'>
      <div class='sticBox' v-show='sticBox'>
        <div class='close' @click='clearLayer'></div>
        <div class='BoxBtn' @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='bounce'>
      <div class='bticBox' v-show='bticBox'>
        <div class='close' @click='clearLayer'></div>
        <div class='BoxBtn' @click='clearLayer'></div>
      </div>
    </transition>
  </div>
</template>
<script>
 export default {
    name: 'init',
    data () {
      return {
        json : {
          sess_token: this.$common.common.$_GET('sess_token'),
          act_id: this.$common.common.$_GET('id'),
          model_idfa: this.$common.common.$_GET('model_idfa'),
        },
        pageTitle : '',
        href : 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=51',
        pvshow : false,
        pvnum : 0,
        layerblack : false,
        ruleLayer : false,
        loading : false,
        shareLayer : false,
        noticeWord:'活动最终解释权归好享瘦APP所有<br>本活动与苹果公司无关',
        tic_1 : true,
        tic_2 : false,
        tic_3 : false,
        sticBox : false,
        bticBox : false,
        // 是否激活
        sType : {
          'sTicType' : true,
          'sTicTypeActive' : false
        },
        bType : {
          'bTicType' : true,
          'bTicTypeActive' : false
        },
        // 券的UI
        mainTic : {
          'mainTic_1' : true,
          'mainTic_2' : false,
          'mainTic_3' : false,
        },
        // 点击领取按钮状态
        getBtn : {
          'getBtn_1' : true,
          'getBtn_2' : false,
          'getBtn_3' : false,
        },
        // 通往我的福利
        sTicLocation : false,
        bTicLocation : false,
        getTarget : 1, //领取券码目标
      }
    },
    mounted(){
      var _this = this
      this.$common.actjs.resizeWindow();
      this.$common.actjs.init(this.href);
      this.$common.common.preLoading( "stressing" );

      this.$nextTick( function () {
        _this.$common.common.buriedPoint()
        _this.shareFun();//分享数据
        _this.pv();//pv数据
        _this.loadTic();
      })

      //背景色填充
      var clientH = document.documentElement.clientHeight;
      $('.warp').css( 'height', clientH + 'px' );
    },
    methods: {
      channelHref () {
        var _this = this
        this.$nextTick( function () {
          var ua = window.navigator.userAgent;
          var IsAndroid = new RegExp('Android').test(ua);
          var isAndroidQQ = new RegExp('Mobile MQQBrowser').test(ua);
          var MicroMessenger = new RegExp('MicroMessenger').test(ua);
          var isIos = new RegExp('iPhone').test(ua);
          var isIpad = new RegExp('iPad').test(ua);
          var isIosQQ = new RegExp(' QQ/').test(ua);
          if(IsAndroid){
            _this.noticeWord = '活动最终解释权归好享瘦APP所有'
          }
          this.href = ((IsAndroid && isAndroidQQ && !MicroMessenger) || (isIos && isIosQQ) || (isIpad && isIosQQ)) ? 'https://www.hxsapp.com/download' : this.href;
          $('.d_foot a').attr( 'href', this.href );
        })
      },
      shareFun () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/activityIQY/ActivityIqiyi/actInfo' , {params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              this.$common.actjs.shareFun(data.data.data);
              _this.actId = data.data.data.id
              _this.pageTitle = data.data.data.title
              document.title = data.data.data.title
            }
          })
      },
      pv () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/activityIQY/ActivityIqiyi/pv',{params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              _this.pvshow = true
              _this.pvnum = data.data.data.sum + '人参加'
              // _this.headPv = data.data.data.sum + '人参加'
            }
          })
      },
      showRuleLayer () {
        this.layerblack = true
        this.ruleLayer = true
      },
      clearLayer () {
        this.layerblack = false
        this.ruleLayer = false
        this.sticBox = false
        this.bticBox = false
        this.shareLayer = false
      },
      gobouns (type) {
        var _this = this
        if(this.$common.actjs.checklogin(this.href) == false){
          return false
        }
        if (type == 0){
          if (!_this.sTicLocation){
            _this.$common.common.toastTip('.toast_tip', '请先领取10元爱奇艺季度券', 1500)
          } else {
            // _this.$common.common.buriedPoint('查看10元券', '查看10元券');
            window.location.href = 'https://hxsapp_jump_myactivity#1'
          }
        } else if (type == 1){
          if (!_this.bTicLocation){
            _this.$common.common.toastTip('.toast_tip', '请先领取50元爱奇艺季度券', 1500)
          } else {
            // _this.$common.common.buriedPoint('查看50元券', '查看50元券');
            window.location.href = 'https://hxsapp_jump_myactivity#1'
          }
        }
      },
      loadTic (type) {
        var _this = this
        if (type == 1) {
          loadTic_1()
        }else if (type == 2){
          loadTic_2()
        }else if (!type){
          loadTic_1()
          loadTic_2()
        }

        function loadTic_1() {
          _this.$http.jsonp(_this.$common.common._ACTHOST + '/activityIQY/ActivityIqiyi/userTypeOne' , {params:_this.json})
          .then(function(data){
            if ( data.data.code == 200 ) {
              if (data.data.data.is_receive == 1) {
                _this.sType = {
                  'sTicType' : false,
                  'sTicTypeActive' : true
                }
                _this.mainTic = {
                  'mainTic_1' : false,
                  'mainTic_2' : true,
                  'mainTic_3' : false,
                }
                _this.getBtn = {
                  'getBtn_1' : false,
                  'getBtn_2' : true,
                  'getBtn_3' : false,
                }

                _this.sTicLocation = true
                _this.getTarget = 2
              }else if (data.data.data.is_receive == 0) {
                _this.sType = {
                  'sTicType' : true,
                  'sTicTypeActive' : false
                }
              }
            }
          })
        }

        function loadTic_2() {
          _this.$http.jsonp(_this.$common.common._ACTHOST + '/activityIQY/ActivityIqiyi/userTypeTwo' , {params:_this.json})
          .then(function(data){
            if ( data.data.code == 200 ) {
              if (data.data.data.is_receive == 1) {
                _this.bType = {
                  'bTicType' : false,
                  'bTicTypeActive' : true
                }
                _this.mainTic = {
                  'mainTic_1' : false,
                  'mainTic_2' : false,
                  'mainTic_3' : true,
                }
                _this.getBtn = {
                  'getBtn_1' : false,
                  'getBtn_2' : false,
                  'getBtn_3' : true,
                }
                _this.bTicLocation = true
                _this.getTarget = 3
              }else if (data.data.data.is_receive == 0) {
                _this.bType = {
                  'bTicType' : true,
                  'bTicTypeActive' : false
                }
              }
            }
          })
        }
      },
      getTic (type) {
        var _this = this
        if(this.$common.actjs.checklogin(this.href) == false){
          return false
        }
        // if (_this.loading == true) {
        //   _this.$common.common.toastTip('.toast_tip', '请求频繁', 1500)
        //   return
        // }
        type = this.getTarget
        switch (type) {
          case 1:
          var uploadjson_1 = {
            sess_token: this.$common.common.$_GET('sess_token'),
            act_id: this.$common.common.$_GET('id'),
            model_idfa: this.$common.common.$_GET('model_idfa'),
            type:1,
            link:window.location.href
          }
          _this.loading = true
          // _this.$common.common.buriedPoint('领取10元券', '领取10元券');
          this.$http.jsonp(_this.$common.common._ACTHOST + '/activityIQY/ActivityIqiyi/userAdd',{params:uploadjson_1})
            .then(function(data){
              if ( data.data.code == 200 ) {
                _this.loadTic(1)
                _this.layerblack = true
                _this.sticBox = true
              } else {
                _this.$common.common.toastTip('.toast_tip', data.data.msg, 1500)
              }
              _this.loading = false
              // _this.$common.common.toastTip('.toast_tip', data.data.msg, 1500)
            })
          break;

          case 2:
          var uploadjson_2 = {
            sess_token: this.$common.common.$_GET('sess_token'),
            act_id: this.$common.common.$_GET('id'),
            model_idfa: this.$common.common.$_GET('model_idfa'),
            type:2,
            link:window.location.href
          }
          _this.loading = true
          // _this.$common.common.buriedPoint('领取50元券', '领取50元券');
          this.$http.jsonp(_this.$common.common._ACTHOST + '/activityIQY/ActivityIqiyi/userTypeTwo',{params:uploadjson_2})
            .then(function(data){
              if ( data.data.code == 200 ) {
                if( data.data.data.is_share == 0 ) {
                  _this.$common.common.toastTip('.toast_tip', '您需要分享后才可以领取哦', 1500)
                  return
                } else {
                  _this.$http.jsonp(_this.$common.common._ACTHOST + '/activityIQY/ActivityIqiyi/userAdd',{params:uploadjson_2})
                    .then(function(data){
                      if (data.data.code == 200) {
                        _this.loadTic(2)
                        _this.layerblack = true
                        _this.bticBox = true
                      }  else {
                        _this.$common.common.toastTip('.toast_tip', data.data.msg, 1500)
                      }
                    })
                }
              }
              //_this.$common.common.toastTip('.toast_tip', data.data.msg, 1500)
              _this.loading = false
            })
          break;

          case 3:
            this.layerblack = true
            this.shareLayer = true
          break;
        }

      }
    }
  }
</script>
<style lang="less" scoped>
  @import './../assets/common/reset.less';
  @import './../assets/common/iqiyiTic/index.less';
</style>