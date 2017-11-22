<template>
  <div class="warp">
    <div class="mainBox">
      <div class="box_1 box"></div>
      <div class="box_2 box"></div>
      <div class="box_3 box"></div>
      <div class="box_4 box"></div>
      <div class="box_5 box"></div>
      <div class="box_6 box">
        <div class="btn" @click='callbox'></div>
      </div>
      <div class="emptyBox"></div>
    </div>
    <transition name='fade'>
      <div class='layerBack' v-show='layerblack'></div>
    </transition>
    <transition name='down'>
      <div class="child_frame" v-show='copybox'>
        <p class="code" id="outtext" @click='selectAll'>{{mainText}}</p>
        <button class="copybtn" data-clipboard-text="" @click='changeBtn'>点击按钮复制</button>
        <p class="notices">也可长按复制哟！</p>
        <p class="totaobao" v-show='totaobao'>请打开手机淘宝领取</p>
        <div class="closebtn" @click='clearLayer'></div>
      </div>
    </transition>
    <preload></preload>
    <bp></bp>
    <down></down>
    <pv :pv-data='pvData'></pv>
    <share :actData='actData'></share>
    <buried></buried>
    <!-- <remote src='https://cdn.bootcss.com/clipboard.js/1.6.1/clipboard.js'></remote>
                <remote src='https://act.hxsapp.com/userBouns/js/clipboard.min.js'></remote> -->
  </div>
</template>
<script>
import bp from './../components/buriedPoint'
import preload from './../components/preload';
import down from './../components/down'
import remote from './../components/remote'
import share from './../components/shareInfo'
import pv from './../components/pv'
import buried from './../components/buriedPoint'
export default {
  name: 'init',
  components: {
    preload,
    down,
    bp,
    remote,
    share,
    pv,
    buried
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
      actData: {
        act_id: this.$common.common.$_GET('id')
      },
      actId: '',
      pvData: {
        act_id: this.$common.common.$_GET('id')
      },
      pvshow: true,
      href: 'https://www.hxsapp.com/download',
      layerblack: false,
      copybox: false,
      mainText: '复制这条信息￥ubTM0TqrNZs￥后打开手淘',
      totaobao: false
    }
  },
  mounted() {
    var _this = this
    this.$common.actjs.init(this.href);

    window.appShareCallback = function() { }

    var clientH = document.documentElement.clientHeight;
    $('.mainBox').css('height', clientH + 'px');

    this.$nextTick(() => {
      _this.init()
    })
  },
  methods: {
    init() {
      var clipboard = new Clipboard('.copybtn');
      $('.copybtn').attr('data-clipboard-text', this.mainText);

    },
    callbox() {
      this.copybox = true
      this.layerblack = true
    },
    clearLayer() {
      this.copybox = false
      this.layerblack = false

      setTimeout(() => {
        this.totaobao = false
        $('.copybtn').text('点击按钮复制');
        $('.child_frame').css('height', '12em');
      }, 1000)
    },
    changeBtn() {
      $('.copybtn').text('复制成功');//复制成功 → 打开手机淘宝领取
      $('.copybtn').css('animation', 'bounceIn .8s 1 linear');
      $('.child_frame').css('height', '14em');
      $('.notice').hide();

      this.totaobao = true
    },
    selectAll() {
      selectText('outtext');
      $('.code').select();

      function selectText(element) {
        var doc = document,
          text = doc.getElementById(element),
          range,
          selection;

        if (doc.body.createTextRange) {
          range = document.body.createTextRange();
          range.moveToElementText(text);
          range.select();
        } else if (window.getSelection) {
          selection = window.getSelection();
          range = document.createRange();
          range.selectNodeContents(text);
          selection.removeAllRanges();
          selection.addRange(range);
          /*if(selection.setBaseAndExtent){
              selection.setBaseAndExtent(text, 0, text, 1);
          }*/
        } else {
          console.log("none");
        }
      }
    }
  },
  getInfo() {
    var _this = this
    // this.$http.jsonp(_this.$common.common._ACTHOST + '/base/Api/actInfo', { params: _this.json })
    //   .then(function(data) {
    //     if (data.data.code == 200) {
    //       _this.actId = data.data.data.id
    //       document.title = data.data.data.title
    //       _this.actData = data.data.data
    //     }
    //   })
  },
  beforeDestroy() {
    delete window.hxsapp_visible_share_btn_mar;
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
.warp {
  .mainBox {
    background: #7140e7
  }
  .emptyBox {
    width: 100%; // height: 7rem;
    background: #7140e7
  }
  .box {
    position: relative;
  }
  .box_1 {
    background: url('./../assets/img/retailer/bg_1.jpg') left top no-repeat;
    .rback(100%,
    11.47rem);
  }
  .box_2 {
    background: url('./../assets/img/retailer/bg_2.jpg') left top no-repeat;
    .rback(100%,
    9.77rem);
  }
  .box_3 {
    background: url('./../assets/img/retailer/bg_3.jpg') left top no-repeat;
    .rback(100%,
    6.93rem);
  }
  .box_4 {
    background: url('./../assets/img/retailer/bg_4.jpg') left top no-repeat;
    .rback(100%,
    6.9rem);
  }
  .box_5 {
    background: url('./../assets/img/retailer/bg_5.jpg') left top no-repeat;
    .rback(100%,
    16.87rem);
  }
  .box_6 {
    background: #7140e7;
    .rback(100%,
    4.27rem);
    .btn {
      background: url('./../assets/img/retailer/btn.png') left top no-repeat;
      .rback(9.96rem,
      2.196rem);
      .center(9.96rem);
      position: absolute;
      top: 1rem;
      cursor: pointer;
    }
  }
}
</style>
<style lang="css" scoped>
.code {
  padding: .6em 10% 0 10%;
  height: 6em;
  text-align: center;
  font-size: 1rem;
  outline: none;
  border: 0;
  background: none;
  -webkit-user-select: text;
  -moz-user-select: text;
  -o-user-select: text;
  user-select: text;
}

.child_frame {
  display: inline-block;
  position: fixed;
  width: 16.67rem;
  height: 12rem;
  background-color: white;
  top: 12rem;
  left: calc(50% - 8.34rem);
  border: solid 1px #df3a59;
  border-radius: 10px;
  text-align: center;
  padding: .2rem .2rem .5rem .2rem;
}

.child_frame p {
  margin: .5rem 0;
}

.closebtn {
  height: 1.3rem;
  width: 1.3rem;
  top: .35rem;
  right: .35rem;
  position: absolute;
  background-image: url('https://act.hxsapp.com/userBouns/images/closebtn.png');
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  cursor: pointer;
}

.copybtn {
  border: solid 2px black;
  background-color: #ffe13a;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.notices {
  font-size: 12px
}
</style>

