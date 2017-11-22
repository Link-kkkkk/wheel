<template>
  <div class="invitePage" :style='pageHeight'>
    <preload></preload>
    <down :downLink='href' :linkedMe='linkedMe'></down>
    <share :actData='actData' v-if='shareCom'></share>
    <pv :pv-data='pvData'></pv>
    <!-- <foot></foot> -->
    <buried></buried>

    <div class="content">
      <div class="box_1" :style='pageHeight'>
        <div class="boxIn" :style='iconHeight'>
          <div class="ruleBtn" @click='callRule()'></div>
          <div class="titleLogo">
            <p class="inviteNum" v-if='userType' :style='numTop'>已成功邀请
              <span>{{invitePerson}}</span>人</p>
          </div>
          <div class="btnBox" :style='btnTop'>
            <div class="btn" @click='draw()'></div>
            <p v-if='userType'>还剩
              <span>{{drawTime}}</span>次领取机会</p>
          </div>
          <div class="bottomLine" v-if='userType' @click='callShare()'>
            <div class="finger"></div>
          </div>
        </div>
      </div>
      <div class="box_2" v-if='guestType'>
        <div class="inviteCode">{{userCode}}</div>
        <div class="codeNotice">
          <p>长按邀请码复制</p>
        </div>
        <div class="clickBox">
          <a class="" @click='goDown()'>
            <img :src='shareLine' />
          </a>
          <div class="tapNotice">注册时请在性别选择页面填写邀请码</div>
        </div>
        <div class="qrArea">
          <div class="qrBox">
            <img class="qr" :src='qr' />
          </div>
        </div>
      </div>
    </div>

    <transition name='fade'>
      <div class='layerBack' v-show='layerblack'></div>
    </transition>
    <transition name='down'>
      <div class='ruleBox' v-show='layerRule'>
        <div class="close" @click="clearLayer"></div>
        <p class="title">
          <span>活动</span>规则</p>
        <div class="ruleDetail">
          <p>1. 分享活动给好友，好友完成下载，新用户需要输入好友的邀请码，注册成功后视为成功邀请；</p>
          <p>2. 每邀请一位好友即可获得一次抽取奖品机会。</p>
          <p>3. 每个手机号码仅限注册一次；</p>
          <p>4. 邀请越多，福利越大哦。</p>
        </div>
      </div>
    </transition>
    <transition name='down'>
      <div class='shareBox' v-show='layerShare' @click="clearLayer">
        <div class="arrow"></div>
        <p>动动手指让好友领取福利</p>
      </div>
    </transition>
    <transition name='down'>
      <div class='lessBox' v-show='layerLess'>
        <div class="close" @click="clearLayer"></div>
        <div class="btn" @click="lessBtn()"></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='inBox' v-show='layerIn'>
        <div class="close" @click="clearLayer"></div>
        <div class="rewardName">
          <p>{{rewardName}}</p>
        </div>
        <div class="rewardimg">
          <img :src="rewardImg">
        </div>
        <div class="btn" @click="lessBtn()"></div>
        <div class="go" @click='goMyBouns()'></div>
      </div>
    </transition>
  </div>
</template>

<script>
import com from './../util/common'

import foot from './../components/footNotice'
import down from './../components/down'
import preload from './../components/preload'
import share from './../components/shareInfo'
import pv from './../components/pv'
import buried from './../components/buriedPoint'

import mock from 'mockjs'
export default {
  name: 'inviteFriend',
  components: {
    foot,
    down,
    preload,
    share,
    pv,
    buried
  },
  data() {
    return {
      json: {
        sess_token: com.$_GET('sess_token'),
        act_id: com.$_GET('id'),
        model_idfa: com.$_GET('model_idfa'),
      },
      buriedJson: {
        access_occurred_type: 110102,//发生访问的【页面】类型
        access_occurred_type_id: com.$_GET('id'),//发生访问的【页面】类型ID
        previous_event_type_obj: '',//【事件】对象类型
        previous_event_type_obj_id: '',//【事件】对象类型ID
        previous_content_sort: ''//【事件】事件参数
      },
      actData: {
        sess_token: com.$_GET('sess_token'),
        act_id: com.$_GET('id'),
        model_idfa: com.$_GET('model_idfa'),
        link: ''
      },
      linkedMe: null,
      pvData: null,
      href: 'https://www.hxsapp.com/download',
      pvshow: true,
      layerblack: false,

      shareCom: true,
      shareLink: '',
      // css转换
      pageHeight: null,
      iconHeight: null,
      numTop: null,
      btnTop: null,
      userType: true,
      guestType: false,

      // layer
      layerblack: false,
      layerRule: false,
      layerShare: false,
      layerLess: false,
      layerIn: false,

      shareLine: require('./../assets/img/invite/shareLine.png'),
      qr: require('./../assets/img/invite/qr.png'),
      rewardName: '',
      rewardImg: '',
      invitePerson: 0,
      drawTime: 0,
      userCode: '',
    }
  },
  created() {
    // this.actData = this.json;
    this.pvData = this.json;
    this.getTimes()
    // linkme
    var __url = 'https://app.hxsapp.com/actweb/seckill/invite/user?id=' + com.$_GET('id');
    this.linkedMe = {
      params: {
        // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
        "key": "hxsapp://web?url=" + __url
      }
    }
  },
  mounted() {
    var _this = this

    window.appShareCallback = function() {
      _this.clearLayer()
    }

    window.hxsapp_visible_share_btn_mar = function() {
      com.newburiedPoint(_this.buriedJson)
    }

    this.$nextTick(() => {
      this.getType()
      this.setHeight()
    })
  },
  methods: {
    setHeight() {
      var clientH = document.documentElement.clientHeight;
      // if (clientH > 750) {
      //   clientH = 750
      // }

      if (this.userType) {
        this.pageHeight = { 'height': clientH + 'px' }
        this.iconHeight = { 'height': clientH + 'px' }
        this.numTop = { 'top': clientH * .37 + 'px' }
        this.btnTop = { 'top': clientH * .74 + 'px' }
      } else {
        this.pageHeight = null
        this.iconHeight = null
        this.numTop = null
        this.btnTop = null
      }
    },
    getType() {
      if (this.$route.params.type === 'user') {
        this.userType = true
        this.guestType = false
      } else {
        this.userType = false
        this.guestType = true
        this.userCode = com.$_GET('code')
      }
    },
    getTimes() {
      var _this = this
      this.$http.jsonp('https://act.hxsapp.com/draw/inviteFriend/times', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.invitePerson = data.data.data.invited_count
            _this.drawTime = data.data.data.draw_times
            _this.userCode = data.data.data.code
            _this.shareLink = 'https://app.hxsapp.com/actweb/seckill/invite/guest?id=' + com.$_GET('id') + '&code=' + _this.userCode
            _this.actData.link = _this.shareLink
          } else {
            console.log('未登录')
            _this.invitePerson = 0
            _this.drawTime = 0
            _this.userCode = com.$_GET('code')
            _this.shareLink = 'https://app.hxsapp.com/actweb/seckill/invite/guest?id=' + com.$_GET('id')
            _this.actData.link = _this.shareLink
          }
        })
    },
    draw() {
      var _this = this
      if (com.checklogin(_this.href) == false) {
        return false
      }

      this.$http.jsonp('https://act.hxsapp.com/draw/inviteFriend/trigger', { params: _this.json })
        .then(function(data) {
          console.log(data.data)
          if (data.data.code == 200) {
            // com.toastTip(data.data.msg)
            _this.rewardName = data.data.data.award.name
            _this.rewardImg = data.data.data.award.img
            _this.drawTime = data.data.data.draw_times
            _this.callIn()
          } else if(data.data.code == 600){
            _this.callLess()
          } else {
            com.toastTip(data.data.msg)
          }
        })
    },
    mockDraw() {
      var _this = this
      var mockData = mock.mock({
        "data": {
          "number|1-100": 100
        }
      })
      if (mockData.data.number > 50) {
        _this.callIn()
      } else {
        _this.callLess()
      }
    },
    goDown() {
      window.location.href = this.href
    },
    goMyBouns() {
      var _this = this
      if (com.checklogin(_this.href) == false) {
        return false
      } else {
        _this.shareCom = false;
        setTimeout(() => {
          _this.shareCom = true;
        }, 2000)
        // console.log('go我的福利')
        window.location.href = 'https://hxsapp_jump_myactivity#1'
      }
    },
    lessBtn() {
      this.clearLayer();
      this.callShare();
    },
    callRule() {
      this.layerblack = true;
      this.layerRule = true;
    },
    callShare() {
      this.layerblack = true;
      this.layerShare = true;
    },
    callIn() {
      this.layerblack = true;
      this.layerIn = true;
    },
    callLess() {
      this.layerblack = true;
      this.layerLess = true;
    },
    clearLayer() {
      this.layerblack = false;
      this.layerRule = false;
      this.layerShare = false;
      this.layerLess = false;
      this.layerIn = false;
    },
  }
}
</script>

<style lang="less" scoped>
@import './../assets/common/reset.less';
.invitePage {
  background: #440264;
  width: 100%;
  position: relative;
  min-width: 300px;
}

.content {
  // height: 100%;
  .box_1 {
    .back(100%, 45rem, './../../assets/img/invite/bg.jpg');
    position: relative;
    .boxIn {
      .back(100%, 40rem, './../../assets/img/invite/bg_1.png');
      .ruleBtn {
        .back(4.2rem, 1.7rem, './../../assets/img/invite/ruleBtn.png');
        position: absolute;
        top: 2.5rem;
        right: 0;
      }
      .inviteNum {
        width: 100%;
        text-align: center;
        position: absolute;
        top: 14.87rem;
        span {
          font-weight: bold;
        }
      }
      .btnBox {
        width: 100%; // background: linear-gradient(90deg, #70e1f5, #ffd194);
        position: absolute;
        top: 29.5rem;
        text-align: center;
        .btn {
          .back(11.47rem, 3.3rem, './../../assets/img/invite/getBtn.png');
          margin: 0 auto;
        }
        p {
          font-size: 1rem;
          color: #FFF;
          margin-top: .5rem;
          span {
            font-weight: bold;
          }
        }
      }
      .bottomLine {
        .back(100%, 3.2rem, './../../assets/img/invite/floatLine.png');
        position: fixed;
        bottom: 0;
        left: 0;
        .finger {
          .back(2.27rem, 1.67rem, './../../assets/img/invite/finger_2.png');
          position: absolute;
          right: 4.8rem;
          bottom: .2rem;
        }
      }
    }
  }
  .box_2 {
    background: url(./../assets/img/invite/bg_2.jpg) top left no-repeat;
    background-size: 100% 100%;
    margin-top: -1px;
    .inviteCode {
      font-size: 2rem;
      font-family: 'PingFangSC-Medium, sans-serif;';
      color: #FFF;
      padding: 3rem 0 .5rem 0;
      text-align: center;
      user-select: auto;
      -webkit-user-select: auto;
    }
    .codeNotice {
      text-align: center;
      p {
        display: inline-block;
        font-size: .87rem;
        color: #fff275;
        padding: .5rem;
        border-radius: .5rem;
        background: #602796;
      }
    }
    .clickBox {
      text-align: center;
      padding: 1.67rem 0;
      img {
        width: 21.7rem;
        height: 4.37rem;
        display: inline-block;
      }
      .tapNotice {
        font-size: .87rem;
        color: #b288c6;
      }
    }
    .qrArea {
      padding-bottom: 2.67rem;
      text-align: center;
      .qrBox {
        .back(10.67rem, 10.73rem, './../../assets/img/invite/qrback.png');
        display: inline-block;
        position: relative;
        .qr {
          position: absolute; // .back(7.6rem, 7.6rem, './../../assets/img/invite/qr.png');
          width: 7.6rem;
          height: 7.6rem;
          .center(7.6rem);
          top: .5rem;
          user-select: auto;
          -webkit-user-select: auto;
        }
      }
    }
  }
}

.close {
  .back(1.3rem, 1.3rem, './../../assets/img/invite/close.png');
  position: absolute;
  right: -.65rem;
  top: -.65rem;
}

.ruleBox {
  width: 21.17rem;
  .center(21.17rem);
  position: fixed;
  top: 8rem;
  background: #FFF;
  border-radius: .5rem;
  .title {
    padding: 2.5rem 0 1.17rem 0;
    text-align: center;
    font-size: 1.6rem;
    font-weight: bold;
    span {
      color: #ea1744;
    }
  }
  .ruleDetail {
    padding: 0 1.17rem 2.5rem 1.17rem;
    line-height: 1.8em;
    font-size: .87rem;
  }
}

.shareBox {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .arrow {
    .back(100%, 26.5rem, './../../assets/img/invite/arrow.png');
    position: absolute;
    top: 0;
    left: 0;
  }
  p {
    font-size: 1.33rem;
    color: #FFF;
    text-align: center;
    width: 100%;
    padding-top: 27.5rem;
  }
}

.lessBox {
  .back(16.5rem, 16.5rem, './../../assets/img/invite/layless.png');
  .center(16.5rem);
  position: fixed;
  top: 6rem;
  .btn {
    .back(12.33rem, 2.27rem, './../../assets/img/invite/btninvite.png');
    .center(12.33rem);
    position: absolute;
    top: 12.17rem;
  }
}

.inBox {
  .back(16.5rem, 20.77rem, './../../assets/img/invite/layin.png');
  .center(16.5rem);
  position: fixed;
  top: 6rem;
  .rewardName {
    padding-top: 8.4rem;
    font-size: 1.2rem;
    color: #f4325b;
    text-align: center;
  }
  .rewardimg {
    width: 6.67rem;
    height: 6.67rem;
    margin: 0 auto 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .btn {
    .back(12.33rem, 2.27rem, './../../assets/img/invite/btnmore.png');
    .center(12.33rem);
    position: absolute;
    top: 16.83rem;
  }
  .go {
    // background: linear-gradient(90deg, #70e1f5, #ffd194);
    width: 5.5rem;
    height: .87rem;
    position: absolute;
    bottom: 0.5rem;
    .center(5.5rem);
  }
}
</style>
