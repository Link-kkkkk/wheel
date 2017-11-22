<template>
  <div class="page">
    <preload></preload>
    <down :downLink='href' :linkedMe='linkedMe'></down>
    <share :actData='actData'></share>
    <pv :pv-data='pvData'></pv>
    <foot></foot>
    <buried></buried>

    <div class="content">
      <div class="box_1">
        <!-- <div class="ruleBtn" @click='showInfoLayer'></div> -->
        <div class="ruleBtn" @click='showRule'></div>
        <p class="acttime">活动时间:{{acttime}}</p>
      </div>
      <div class="box_2">
        <p class="openTime_1">上午 11:11</p>
        <p class="openTime_2">下午 17:11</p>
      </div>
      <div class="box_3">
        <div class="waveBox" v-for='(data,i) in productWaveArr' :key='i'>
          <p class="waveTile">{{productWaveArr[i].wave}}</p>
          <p class="count" v-html='productWaveArr[i].type'></p>
          <div class="productArea">
            <div class="productBox" v-for='(data, j) in productLongArr[i]' :key='j'>
              <img :src='productImgArr[i * productLongArr[i] + j]'>
              <div class="rushBtn">
                <div class="rushBtnText" @click='rush(productIndexArr[i * productLongArr[i] + j])' :style='rushBtn.color[i * productLongArr[i] + j]' :type='productTypeArr[i * productLongArr[i] + j]'>
                  {{rushBtn.text[i * productLongArr[i] + j]}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name='fade'>
      <div class='layerBack' v-show='layerblack'></div>
    </transition>
    <transition name='down'>
      <div class='ruleBox' v-show='ruleLayer'>
        <div class="close" @click="clearLayer"></div>
        <div class="ruleDetail">
          <div class="ruleDetailBox">
            <p>1.好享瘦APP所有用户都可参与。</p>
            <p>2.每个用户ID限秒杀一件商品。</p>
            <p>3.以系统提示“秒杀成功”为准，如遇到系统提示“已秒光”，请选择其他产品。</p>
            <p>4.秒杀成功后工作人员将会在活动结束后3个工作日内邮寄，请留意查收。</p>
            <p>5.如有疑问，可在线咨询客服。</p>
          </div>
          <div class="confirmBtn" @click="clearLayer"></div>
        </div>
      </div>
    </transition>
    <transition name='down'>
      <div class='commitBox' v-show='infoLayer'>
        <div class="close" @click="clearLayer"></div>
        <input type="text" class="nameInner" maxlength="10" placeholder="请输入姓名" v-model="userName">
        <input type="tel" class="phoneInner" maxlength="11" placeholder="请输入手机号码" v-model="userPhone">
        <input type="text" class="addInner" maxlength="255" placeholder="请输入地址" v-model="userAdd">
        <div class="confirmBtn" @click="commitInfo"></div>
      </div>
    </transition>
    <transition name='down'>
      <div class='outBox' v-show='outLayer'>
        <div class="confirmBtn" @click="clearLayer"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import foot from './../components/footNotice';
import down from './../components/down'
import preload from './../components/preload'
import share from './../components/shareInfo'
import com from './../util/common'
import pv from './../components/pv'
import buried from './../components/buriedPoint'
export default {
  name: 'init',
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
      ruleLayer: false,
      infoLayer: false,
      outLayer: false,
      userName: '',
      userPhone: '',
      userAdd: '',
      nowtime: '',
      rushGoodId: '',

      acttime: '',
      // 产品序列
      productIndex: 0,
      productIndexArr: [],
      productLongArr: [],
      productWaveArr: [],

      productOutArr: [],
      productIdArr: [],
      productStockArr: [],
      productImgArr: [],
      productTitleArr: [],
      productSubArr: [],

      productTypeArr: [],
      productTimeArr: [],
      // 两个时钟
      waveArr_1: {
        day: '',
        hour: '',
        min: '',
        sec: ''
      },
      waveArr_2: {
        day: '',
        hour: '',
        min: '',
        sec: ''
      },

      countingNum: {
        'color': '#fffe00',
      },
      rushBtn: {
        color: [],
        text: []
      },
      resetLock: false,
      loadLock: false
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
      this.getNowtime();
    })
  },
  methods: {
    getNowtime: function(result) {
      var _this = this
      var callback = '';
      $.getJSON('https://act.hxsapp.com' + '/friSeckill/Main/actInfo?callback=?', _this.json, function(data) {
        if (data.code == 200) {
          _this.nowtime = data.data.ser_time;
          //内部执行读取数据的函数获取当前时间
          _this.loadData();
          _this.acttime = getActTime(data.data.start_time, data.data.end_time)
          function getActTime(start, end, con) {
            var startFirst = start.slice(5, 7)
            var startLast = start.slice(8, 10)
            var endFirst = end.slice(5, 7)
            var endLast = end.slice(8, 10)
            if (parseInt(startFirst) < 10) {
              startFirst = start.slice(6, 7)
            }
            if (parseInt(endFirst) < 10) {
              endFirst = end.slice(6, 7)
            }
            if (!con) { con = '-' }
            var startTime = startFirst + '月' + startLast + '日'
            var endTime = endFirst + '月' + endLast + '日'
            var acttime = startTime + con + endTime
            return acttime
          }
        }
      })
    },
    loadData: function(type) {
      var _this = this
      $.getJSON('https://act.hxsapp.com' + '/friSeckill/Goods/lists?callback=?', _this.json, function(data) {
        var count = 0;
        $.each(data.data, function(i, j) {
          count++;
          var thisTimeS = _this.nowtime * 1000;
          var dataTime = i.split('-');
          var times = dataTime[0] + '/' + dataTime[1] + '/' + dataTime[2];
          var actTimeS = _this.timesTamp(times);
          var waveType = i.substring(11, 13);
          // console.log(i)
          // 每次遍历push一个新的对象，不然会返回undefined
          _this.productWaveArr.push({ wave: '', type: '' })
          if (parseInt(waveType) < 12) {
            _this.productWaveArr[(count - 1)].wave = '第一波产品'
          } else if (parseInt(waveType) >= 12) {
            _this.productWaveArr[(count - 1)].wave = '第二波产品'
          }
          // switch (waveType) {
          //   case '11':
          //     _this.productWaveArr[(count - 1)].wave = '第一波产品'
          //     break;
          //   case '17':
          //     _this.productWaveArr[(count - 1)].wave = '第二波产品'
          //     break;
          //   default:
          //     _this.productWaveArr[(count - 1)].wave = '更多产品'
          //     break;
          // }

          //每波奖品数
          $.each(j, function(i) {
            _this.productIndexArr.push(_this.productIndex);
            _this.productIndex++;
            _this.productLongArr.push(j.length)

            // 按钮数组
            if (j[i].stock == '0') {
              _this.productOutArr.push(true)
              _this.rushBtn.color.push({
                background: '#bebebe'
              })
              _this.rushBtn.text.push('已抢完')
            } else {
              _this.productOutArr.push(false)
              _this.rushBtn.color.push({
                background: '#f10637'
              })
              _this.rushBtn.text.push('点击抢购')
            }

            // 时间数组
            var productTime = j[i].sale_time.split('-');
            var times = dataTime[0] + '/' + dataTime[1] + '/' + dataTime[2];
            var timesSec = _this.timesTamp(times) / 1000;
            if (_this.nowtime <= timesSec) {
              _this.productTypeArr.push('counting')
            } else if (_this.nowtime < timesSec + (60 * 60)) {
              _this.productTypeArr.push('on')
            } else {
              _this.productTypeArr.push('end')
            }

            _this.productIdArr.push(j[i].id)
            _this.productStockArr.push(j[i].stock)
            _this.productImgArr.push(j[i].img)
            _this.productTitleArr.push(j[i].title)
            _this.productSubArr.push(j[i].subtitle)
          })

          if (thisTimeS <= actTimeS) {
            //这个时段活动倒计时了
            let index = count - 1
            _this.productWaveArr[index].type = '距离活动开始: <span class="counting">00:00:00:00</span>';
            _this.timer(actTimeS, _this.nowtime, _this.waveArr_1, index);
          } else if (thisTimeS < actTimeS + (1000 * 60 * 60)) {
            //这个时段进行中
            _this.productWaveArr[(count - 1)].type = '火热进行中'
          } else if (thisTimeS > actTimeS + (1000 * 60 * 60)) {
            //这个时段活动结束了
            _this.productWaveArr[(count - 1)].type = '活动已结束'
          }

        })
        _this.loadLock = true
      })
    },
    resetAll() {
      var _this = this
      var long = $(window).scrollTop()
      _this.loadLock = false
      _this.productIndex = 0
      _this.productIndexArr = [];
      _this.productLongArr = [];
      _this.productWaveArr = [];

      _this.productOutArr = [];
      _this.productIdArr = [];
      _this.productStockArr = [];
      _this.productImgArr = [];
      _this.productTitleArr = [];
      _this.productSubArr = [];

      _this.productTypeArr = [];
      _this.rushBtn = {
        color: [],
        text: []
      }

      setTimeout(() => {
        _this.loadData()
        var reloadTimer = setInterval(() => {
          if (_this.loadLock) {
            $('html').scrollTop(long)
            clearInterval(reloadTimer)
          }
        }, 20)
      }, 1000)
    },
    resetType() {
      var _this = this
      _this.productTypeArr = []
      $.getJSON('https://act.hxsapp.com' + '/friSeckill/Goods/lists?callback=?', _this.json, function(data) {
        var count = 0;
        $.each(data.data, function(i, j) {
          var thisTimeS = _this.nowtime * 1000;
          var dataTime = i.split('-');
          var times = dataTime[0] + '/' + dataTime[1] + '/' + dataTime[2];
          var actTimeS = _this.timesTamp(times);
          var waveType = i.substring(11, 13);

          $.each(j, function(i) {
            var productTime = j[i].sale_time.split('-');
            var times = dataTime[0] + '/' + dataTime[1] + '/' + dataTime[2];
            var timesSec = _this.timesTamp(times) / 1000;
            if (_this.nowtime < timesSec + (60 * 60)) {
              _this.productTypeArr.push('on')
            } else if (_this.nowtime + (60 * 60) < timesSec) {
              _this.productTypeArr.push('counting')
            } else {
              _this.productTypeArr.push('end')
            }
            console.log(_this.productTypeArr)
          })
        })
      })
    },
    gettime: function(endtime, nowtime, obj, index) {
      var _this = this
      var EndTime = new Date(endtime);
      var NowTime = _this.nowtime;
      var t = EndTime.getTime() - NowTime * 1000;
      var d = 0;
      var h = 0;
      var m = 0;
      var s = 0;
      if (t > 0) {
        d = Math.floor(t / 1000 / 60 / 60 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
      }

      obj.day = _this.toDoub(d)
      obj.hour = _this.toDoub(h)
      obj.min = _this.toDoub(m)
      obj.sec = _this.toDoub(s)

      if (t <= 0) {
        _this.productWaveArr[index].type = '火热进行中';
        if (!_this.resetLock) {
          _this.resetType()
          _this.resetLock = true
        }
      } else {
        _this.productWaveArr[index].type = '距离活动开始: <span class="counting">' + obj.day + ':' + obj.hour + ':' + obj.min + ':' + obj.sec + '</span>';
      }
    },
    timer: function(endtime, nowtime, obj, index) {
      var _this = this
      var timer = window.setInterval(function() {
        _this.nowtime++;
        var end = endtime;
        var now = _this.nowtime * 1000;
        if (end < now) {
          clearInterval(timer)
          return
        }
        _this.gettime(endtime, nowtime, obj, index);
      }, 1000);
    },
    rush: function(index) {
      var _this = this
      if (com.checklogin(_this.href) == false) {
        return false
      } else if (_this.productTypeArr[index] == 'end') {
        com.toastTip('这波已结束，下波正在靠近')
        return false
      } else if (_this.productTypeArr[index] == 'counting') {
        com.toastTip('秒杀尚未开始，敬请期待！')
        return false
      } else if (_this.productStockArr[index] == 0) {
        _this.showOut()
        // com.toastTip('商品已抢光')
        return false
      } else {
        console.log('rush')
        var rushJson = {
          act_id: com.$_GET('id'),
          model_idfa: com.$_GET('model_idfa'),
          goods_id: _this.productIdArr[index],
          sess_token: com.$_GET('sess_token')
        }
        _this.rushGoodId = _this.productIdArr[index]
        $.getJSON('https://act.hxsapp.com' + '/friSeckill/Main/rush?callback=?', rushJson, function(data) {
          if (data.code == 200) {
            _this.showInfoLayer()
          }
          com.toastTip(data.msg)
        })
      }
    },
    // getGoodInfo: function(good) {
    //   var _this = this
    //   var infoJson = {
    //     act_id: com.$_GET('id'),
    //     goods_id: good,
    //     model_idfa: com.$_GET('model_idfa'),
    //   }
    //   $.getJSON('https://act.hxsapp.com' + '/friSeckill/Goods/info?callback=?', infoJson, function(data) {
    //     $('.reward_product_img').attr('src', data.data.img);
    //     $('.reward_product_name').text(data.data.title);
    //     $('.reward_product').attr('data-id', data.data.id);
    //   });
    // },
    commitInfo: function(good) {
      var _this = this
      if (_this.verification() == false) {
        return false;
      } else {
        var commitLayerJson = {
          goods_id: _this.rushGoodId,
          act_id: com.$_GET('id'),
          model_idfa: com.$_GET('model_idfa'),
          rece_name: _this.userName,
          rece_phone: _this.userPhone,
          rece_address: _this.userAdd,
          sess_token: com.$_GET('sess_token')
        }
        $.getJSON('https://act.hxsapp.com' + '/friSeckill/Main/receInfo?callback=?', commitLayerJson, function(data) {
          if (data.code == 200) {
            _this.clearLayer();
            _this.userName = '';
            _this.userPhone = '';
            _this.userAdd = '';
          }
          com.toastTip(data.msg, 2000)
        });
      }
    },
    verification: function() {
      var _this = this
      // var goodsId = $('.reward_product').attr('data-id');
      var chinese = new RegExp(/^([\u4E00-\u9FA5|a-zA-Z])+$/);
      var mobile = new RegExp(/0?(13|14|15|17|18)[0-9]{9}/);

      var innerName = _this.userName;
      var innerPhone = _this.userPhone;

      var chineseReg = chinese.test(innerName);
      var mobileReg = mobile.test(innerPhone);

      var commitLayerJson = {
        goods_id: _this.rushGoodId,
        act_id: com.$_GET('id'),
        model_idfa: com.$_GET('model_idfa'),
        rece_name: _this.userName,
        rece_phone: _this.userPhone,
        rece_address: _this.userAdd
      }
      if (_this.userName == '') {
        com.toastTip('请输入姓名');
        return false;
      } else if (_this.userPhone == '') {
        com.toastTip('请输入手机号码');
        return false;
      } else if (_this.userAdd == '') {
        com.toastTip('请输入地址');
        return false;
      } else if (!chineseReg) {
        com.toastTip('请输入带中文或26个英文字母的字符');
        return false
      } else if (!mobileReg) {
        com.toastTip('您输入的手机号码有误');
        return false
      }
    },
    showRule() {
      this.layerblack = true;
      this.ruleLayer = true;
    },
    showInfoLayer() {
      this.layerblack = true;
      this.infoLayer = true;
    },
    showOut() {
      this.layerblack = true;
      this.outLayer = true;
    },
    clearLayer() {
      this.layerblack = false;
      this.ruleLayer = false;
      this.infoLayer = false;
      this.outLayer = false;
    },
    toDoub: function(num) {
      var num = num < 10 ? '0' + num : num;
      return num;
    },
    nowtimesTamp: function(time) {
      // 获取某个时间格式的时间戳
      var stringTime = new Date(time);
      timestamp2 = stringTime.toLocaleString();
      return timestamp2;
    },
    timesTamp: function(time) {
      // 获取某个时间格式的时间戳
      var stringTime = time;
      var timestamp2 = Date.parse(new Date(stringTime));
      return timestamp2;
    },
    checklogin: function() {
      if (com.$_GET('shareType') == 1) {
        _this.shareTypeClick();
        return false;
      } else if (token && token.length < 10 || (locationType != -1 && !token)) {
        myUserAgent(function(Version) {
          if (Version && Version >= 2.5) {
            window.location.href = 'https://hxsapp_showloginpage';
          }
        })
        return false;
      }
    },
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
.page {
  background: #411278;
  width: 100%;
  position: relative;
  min-width: 300px;
}

.content {
  padding-bottom: 20px;
}

.box_1 {
  .back(100%, 24.1rem, './../../assets/img/seckill/bg_1.jpg');
  .ruleBtn {
    .back(5.27rem, 1.47rem, './../../assets/img/seckill/ruleBtn.png');
    position: absolute;
    top: 20.67rem;
    left: 0;
  }
  .acttime {
    font-size: 1.07rem;
    color: #FFF;
    position: absolute;
    text-align: center;
    width: 100%;
    top: 22.2rem;
  }
}

.box_2 {
  .back(100%, 10.9rem, './../../assets/img/seckill/bg_2.jpg');
  position: relative;
  p {
    color: #fff;
    position: absolute;
    font-size: 1.07rem;
    top: 8rem;
  }
  .openTime_1 {
    left: calc(~'50% - 6.8rem')
  }
  .openTime_2 {
    left: calc(~'50% + 1.6rem')
  }
}

.waveBox {
  .back(100%, 18.83rem, './../../assets/img/seckill/boxBg.png');
  margin-top: 1.83rem;
  position: relative;
  .waveTile {
    text-align: center;
    width: 100%;
    color: #FFF;
    font-size: 1.6rem;
    font-family: 'PingFangSC-Medium', 'sans-serif';
    padding-top: .65rem;
  }
  .count {
    text-align: center;
    width: 100%;
    color: #FFF;
    font-size: 1.07rem;
    padding-top: 1.5rem;
  }
  .productArea {
    width: calc(~'100% - 2.2rem');
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    padding: .5rem 1rem 0 1.2rem;
    .productBox {
      .back(9.23rem, 11.23rem, './../../assets/img/seckill/boxBack.png');
      margin-left: 1.5rem;
      img {
        width: calc(~'100% - 1.5rem');
        height: calc(~'100% - 0.8rem - 2rem');
        padding: 0.42rem 0.75rem 0.2rem 0.75rem;
      }
      .rushBtn {
        font-size: .67rem;
        color: #FFF;
        text-align: center;
        .rushBtnText {
          background: #f10637;
          display: inline-block;
          padding: .3rem 2.15rem;
          border-radius: .3rem;
        }
      }
    }
  }
}

.confirmBtn {
  .back(8.03rem, 2.4rem, './../../assets/img/seckill/confirm.png');
  .center(8.03rem);
  position: absolute;
  bottom: 1.2rem;
}

.ruleBox {
  .back(22.33rem, 28.67rem, './../../assets/img/seckill/ruleBox.png');
  .center(22.33rem);
  position: fixed;
  top: 6rem;
  .close {
    .back(3.1rem, 3.1rem, './../../assets/img/seckill/close.png');
    position: absolute;
    right: -1rem;
    top: -1rem;
  }
  .ruleDetail {
    padding: 6.67rem .5rem 0 .5rem;
    .ruleDetailBox {
      line-height: 2.2rem;
      font-size: 1.07rem;
      font-family: 'PingFangSC-Medium'
    }
  }
}

.commitBox {
  .back(22.33rem, 32.3rem, './../../assets/img/seckill/commitBox.png');
  .center(22.33rem);
  position: fixed;
  top: 6rem;
  .close {
    .back(3.1rem, 3.1rem, './../../assets/img/seckill/close.png');
    position: absolute;
    right: -1rem;
    top: -1rem;
  }
  input {
    outline: none;
    border: none;
    line-height: 1.67rem;
    height: 1.67rem;
    width: 13.33rem;
    position: absolute;
    left: 6.1rem;
  }
  .nameInner {
    top: 13.5rem;
  }
  .phoneInner {
    top: 17rem;
  }
  .addInner {
    top: 20.5rem;
  }
}

.outBox {
  .back(22.33rem, 19.1rem, './../../assets/img/seckill/out_layer.png');
  .center(22.33rem);
  position: fixed;
  top: 6rem;
  .close {
    .back(3.1rem, 3.1rem, './../../assets/img/seckill/close.png');
    position: absolute;
    right: -1rem;
    top: -1rem;
  }
}
</style>

<style>
/* v-html动态生成的表情不含hash，所以类名样式会被scope阻止 */

.counting {
  color: #fffe00;
}
</style>

