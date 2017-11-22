<template>
  <div class='warp'>
    <div class='pv' v-if='pvshow'><p>{{pvnum}}</p></div>
    <div class='acttime'>
      <p class=''>{{acttime}}</p>
    </div>
    <div class='inputBg' v-if='inputbox'></div>
    <div class='inputArea' v-if='inputbox'>
      <input type="num" placeholder='输入免费试用邀请码' v-model='inviteCode' maxlength='10'>
      <div class='inputBtn' @click='tryBtn'>试用</div>
    </div>
    <div class='ruleBtn' @click='ruleLayer'></div>
    <div class='rollpanBorder' :style='rollpanBorderSpeed'></div>
    <div class='rollpan' :style='panSpeed'></div>
    <div :class='rollBtn' @click='drawBtn'></div>
    <div class='nocite' v-html='noticeWord'></div>
    <transition name='fade'>
      <div class='layerBack' v-if='layerblack'></div>
    </transition>
    <transition name='down'>
      <div class='ruleBox' v-if='layerground'>
        <div class='ruleBoxTitle'><span>活动</span>规则</div>
        <div class='close' @click='clearLayer'></div>
        <p>1、点击转盘领取产品时，需输入活动邀请码方可参与抽奖符合资格用户将会在手机短信上收到我司发送的活动邀请码；</p>
        <p>2、本次活动领取产品的规则由系统随机抽取；</p>
        <p>3、此次活动每个用户ID、手机号、收货地址，每天享有一次点击转盘的机会，但仅有一次领取中奖产品的资格；</p>
        <p>4、活动时间为8月31日-9月4日，历时5天；</p>
        <p>5、领取成功以系统提示成功为准，如遇所有产品领取完　活动将提前结束，请下次继续参与；</p>
        <p>6、活动结束后3天内，我司将安排专人电话联系中奖用户　确认客户收到产品；</p>
        <p>7、活动结束后2周后，我司将安排专人电话联系中奖用户　确认活动产品并收集试用反馈；</p>
        <p>8、如对此活动有其他疑问，请联系020-89180777咨询，本活动公司拥有所有解释权。</p>
      </div>
    </transition>
    <transition name='down'>
      <div class='inviteCodeBox' v-if='inviteCodeLayer'>
        <div class='goDrawBtn' @click='clearLayer'></div>
        <div class='close' @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='oneTimeBox' v-if='oneTime'>
        <div class='oneTimeBtn' @click='clearLayer'></div>
        <div class='close' @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='loseBox' v-if='lose'>
        <div class='loseBtn' @click='clearLayer'></div>
        <div class='close' @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='rewardBox' v-if='reward'>
        <div class='productBox'>
          <img :src=productImg alt="">
        </div>
        <div class='rewardBtn' @click='getCommit'></div>
        <div class='close' @click='clearLayer'></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='commitBox' v-if='commit'>
        <p class='commitPro'>{{userWinningname}}</p>
        <p class='commitNotice'>请输入您的收货信息，以便我们给您寄送</p>
        <input type="text" class='commitName' maxlength='11' v-model='userName'>
        <input type="text" class='commitPhone' maxlength='11' v-model='userPhone'>
        <input type="text" class='commitAdd' maxlength='255' v-model='userAdd'>
        <div class='commitBtn' @click='commitInfo'></div>
        <div class='close' @click='clearLayer'></div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'init',
    data () {
      return {
        json:{
          sess_token: this.$common.common.$_GET('sess_token'),
          act_id: this.$common.common.$_GET('id'),
          model_idfa: this.$common.common.$_GET('model_idfa'),
        },
        href : 'http://app.hxsapp.com/html/channel_statistics.html?channel_id=100',
        pvnum:'',
        pvshow:false,
        inputbox:true,
        layerground:false,
        layerblack:false,
        rolltype:false,
        oneTime:false,
        lose:false,
        inviteCodeLayer:false,
        reward:false,
        commit:false,
        userName:'',
        userPhone:'',
        userAdd:'',
        userWinningId:'',
        userWinningname:'',
        noticeWord:'活动最终解释权归好享瘦APP所有<br>本活动与苹果公司无关',
        rollBtn:'rollBtn_2',
        rollpanBorderSpeed:{
          'animation':'slowroll 60s infinite linear'
        },
        panRollDeg:0,
        panSpeed:'',
        inviteCode:'',
        productImg:'',
        acttime:'',
        drawTime:0,
        rolled:0
      }
    },
    mounted(){
      var _this = this
      this.$common.actjs.resizeWindow();
      this.$common.actjs.init();
      this.$common.common.preLoading( "stressing" );

      this.$nextTick( function () {
        _this.init();//验证邀请码
        _this.shareFun();//分享数据
        _this.pv();//pv数据
        _this.channelHref();//下载链接
      })
      // console.log(_this.$route)
    },
    methods: {
      init () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/vipNewTry/Mod/getInviteCodeState' , {params:this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              _this.inputbox = false
              _this.rolltype = true
              _this.rollBtn = 'rollBtn_1'
            }
          })
      },
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
          _this.href = ((IsAndroid && isAndroidQQ && !MicroMessenger) || (isIos && isIosQQ) || (isIpad && isIosQQ)) ? 'https://www.hxsapp.com/download' : _this.href;
          $('.d_foot a').attr( 'href', _this.href );
        })
      },
      shareFun () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/vipNewTry/Mod/actinfo' , {params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              this.$common.actjs.shareFun(data.data.data);
              document.title = data.data.data.title;
              var start = data.data.data.start_time.slice(6,7) + '/' + data.data.data.start_time.slice(8,10)
              var end = data.data.data.end_time.slice(6,7) + '/' + data.data.data.end_time.slice(8,10)
              _this.acttime = start + '-' + end
            }
          })
      },
      pv () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/vipNewTry/Mod/pv',{params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              _this.pvshow = true
              _this.pvnum = data.data.data.sum + '人参加'
            }
          })
      },
      ruleLayer () {
        this.layerground = true;
        this.layerblack = true;
      },
      clearLayer () {
        this.layerblack = false;
        this.layerground = false;
        this.inviteCodeLayer = false;
        this.oneTime = false;
        this.lose = false;
        this.reward = false;
        this.commit = false;
      },
      oneLayer () {
        this.layerblack = true;
        this.oneTime = true;
      },
      loseLayer () {
        this.layerblack = true;
        this.lose = true;
      },
      rewardLayer () {
        this.layerblack = true;
        this.reward = true;
      },
      getCommit () {
        this.reward = false;
        this.commit = true;
      },
      drawBtn () {
        var _this = this
        if(this.$common.actjs.checklogin(this.href) == false){
          return false
        }
        if(this.rolled>0){
          return
        }
        if(!this.rolltype){
          this.$common.common.toastTip('.toast_tip','请输入免费试用邀请码',1500);
          return
        }else if(this.drawTime>0){
          this.oneLayer();
          return
        }else{
          this.rollPan();
        }
      },
      rollPan () {
        var _this = this
        var rolldeg = 2160
        _this.$common.common.buriedPoint('点击抽奖','点击抽奖')
        this.$http.jsonp(_this.$common.common._ACTHOST + '/vipNewTry/Mod/draw',{params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              _this.rolled++
              _this.userWinningId = data.data.data.winning_id
              _this.userWinningname = data.data.data.name
              _this.productImg = data.data.data.image
              _this.panRollDeg -= -(2160 - data.data.data.location)
              _this.panSpeed = {
                'transform':'rotate('+ _this.panRollDeg +'deg)',
              }
              _this.drawTime++
              setTimeout(function(){
                _this.rewardLayer()
                _this.rolled--
              },6000)
            }else if(data.data.code == 607){
              _this.panRollDeg -= -(2160-270)
              _this.panSpeed = {
                'transform':'rotate('+ _this.panRollDeg +'deg)',
              }
              _this.drawTime++
              setTimeout(function(){
                _this.loseLayer()
              },6000)
            }else if(data.data.code == 600){
              _this.oneLayer()
            }else{
              _this.$common.common.toastTip('.toast_tip',data.data.msg,1500);
            }
          })
      },
      tryBtn () {
        var _this = this
        var cjson = {
          sess_token: _this.$common.common.$_GET('sess_token'),
          act_id: _this.$common.common.$_GET('id'),
          model_idfa: _this.$common.common.$_GET('model_idfa'),
          code: _this.inviteCode
        }
        if(this.$common.actjs.checklogin(this.href) == false){
          return false
        }
        if(this.inviteCode === ''){
          this.$common.common.toastTip('.toast_tip','邀请码不能为空，请重新输入！',1500);
          return false;
        }
        this.$http.jsonp(_this.$common.common._ACTHOST + '/vipNewTry/Mod/verifyInviteCode',{params:cjson})
          .then(function(data){
            if(data.data.code==200){
              _this.inputbox = false
              _this.rolltype = true
              _this.rollBtn = 'rollBtn_1'
              _this.inviteCodeLayer = true
              _this.layerblack = true
            }else{
              this.$common.common.toastTip('.toast_tip',data.data.msg,1500);
            }
          })
      },
      commitInfo () {
        var _this = this
        var commitJson = {
          sess_token: _this.$common.common.$_GET('sess_token'),
          model_idfa: _this.$common.common.$_GET('model_idfa'),
          winning_id:_this.userWinningId,
          name:_this.userName,
          phone:_this.userPhone,
          address:_this.userAdd,
        }
        if(_this.verification() == false){
          return false
        }
        this.$http.jsonp(_this.$common.common._ACTHOST + '/vipNewTry/Mod/consignee',{params:commitJson})
          .then(function(data){
            if(data.data.code==200){
              _this.clearLayer();
            }
            _this.$common.common.toastTip('.toast_tip',data.data.msg,1500);
          })
      },
      verification (phone,chi) {
        var _this = this
        var mobile = new RegExp(/0?(13|14|15|17|18)[0-9]{9}/);
        if(_this.userName == ''){
          this.$common.common.toastTip('.toast_tip','请输入姓名', 1500);
          return false
        }else if(_this.userPhone == ''){
          this.$common.common.toastTip('.toast_tip','请输入手机号码', 1500);
          return false
        }else if(_this.userAdd == ''){
          this.$common.common.toastTip('.toast_tip','请输入您的地址', 1500);
          return false
        }else if(!mobile.test(_this.userPhone)){
          this.$common.common.toastTip('.toast_tip','请输入正确的手机号', 1500);
          return false
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  @import './../assets/common/reset.less';
  @import './../assets/common/vipnew.less';
</style>
<style scoped>
  .pv {
    top: 50px !important;
  }
</style>

