<template>
  <div class="everyPage">
    <preload></preload>
    <down :downLink='href' :linkedMe='linkedMe'></down>
    <share :actData='actData'></share>
    <pv :pv-data='pvData'></pv>
    <foot></foot>
    <buried></buried>

    <div class="content">
      <div class="titleBg"></div>
      <div class="box_1">
        <div class="title"></div>
        <div class="productArea">
          <div class="productBox">
            <div class="left">
              <div class="name"></div>
              <div class="des"></div>
              <div class="prise"></div>
              <div class="prise_2"></div>
              <div class="cost"></div>
              <div class="btn"></div>
            </div>
            <div class="right picbox">
              <div class="productImg"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="box_2">
        <div class="title"></div>
        <div class="productArea">
          <div class="productBox">
            <div class="left picbox">
              <div class="productImg"></div>
            </div>
            <div class="right">
              <div class="name"></div>
              <div class="des"></div>
              <div class="prise"></div>
              <div class="prise_2"></div>
              <div class="cost"></div>
              <div class="btn"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import com from './../util/common'

import foot from './../components/footNotice';
import down from './../components/down'
import preload from './../components/preload'
import share from './../components/shareInfo'
import pv from './../components/pv'
import buried from './../components/buriedPoint'

export default {
  name: 'bestEveryday',
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
      actData: null,
      linkedMe: null,
      pvData: null,
      href: 'https://www.hxsapp.com/download',
      pvshow: true,
      layerblack: false,
    }
  },
  created() {
    this.actData = this.json;
    this.pvData = this.json;
    // linkme
    var __url = 'https://app.hxsapp.com/actweb/seckill/seckill?id=' + com.$_GET('id');
    this.linkedMe = {
      params: {
        // key 是写死的   value是协议，具体见这里－http://wiki.sys.hxsapp.net/pages/viewpage.action?pageId=1998876
        "key": "hxsapp://web?url=" + __url
      }
    }
  },
  mounted() {
    var _this = this

    this.$nextTick(() => {

    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import './../assets/common/reset.less';
.everyPage {
  background: #2e0566;
  width: 100%;
  position: relative;
  min-width: 300px;
}

.content {
  padding-bottom: 20px;
}

.titleBg {
  .back(100%, 21.67rem, './../../assets/img/every/bg.jpg');
}

.box_1 {
  .title {
    .back(100%, 4.27rem, './../../assets/img/every/bg_2.jpg');
  }
}

.box_2 {
  .title {
    .back(100%, 5.33rem, './../../assets/img/every/bg_3.jpg');
  }
}

.productArea {
  height: 11.7rem;
  width: 100%;
  text-align: center;
  .productBox {
    // display: inline-block;
    background: #FFF;
    border: .1rem solid #854efb;
    border-radius: .5rem;
    width: calc(~'100% - 1.33rem - .2rem');
    margin-left: .66rem + .1rem;
    height: 11.5rem;
    display: flex;
    display: -webkit-flex;
    .left,
    .right {
      width: 50%;
      height: 100%;
    }
    .picbox {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      .productImg {
        height: 95%;
        width: 95%;
        background: red;
      }
    }
  }
}
</style>
