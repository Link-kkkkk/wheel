<template>
  <div class="page">
    <preload></preload>
    <down downLink='href'></down>
    <share :actData='actData'></share>

    <div class="topbox">
      <div class="time_line"></div>
      <div class="rule_icon"></div>
    </div>
    <div class="shelves_box" :class='boxArr[n-1]' v-for='n in 3' :key='n'>
      <div class="secarea clearfix">
        <!-- 倒计时区 -->
        <div class="secbox sectime" v-if='countType[n]'>
          <p>距离活动开始</p>
          <p class="sectime_timebox">
            <span class="sectime_day_'+count+'"></span>
            <span>天</span>
            <span class="sectime_hour_'+count+'"></span>
            <span>时</span>
            <span class="sectime_min_'+count+'"></span>
            <span>分</span>
            <span class="sectime_sec_'+count+'"></span>
            <span>秒</span>
          </p>',
        </div>
        <!-- 抢购区 -->
        <div class="secbox secend hotsecbox" v-if='onType[n]'>
          <p>火热进行中</p>
        </div>
        <!-- 结束区 -->
        <div class="secbox secend" v-if='edType[n]'>
          <p>活动已结束</p>
        </div>
      </div>
      <div class="product_box">
        <div class="product_box_c" :data-id="productIdArr[(n-1)*3 + (m-1)]" v-for='m in 3' :key='m'>
          <div class="product_img">
            <img :src="productImgArr[(n-1)*3 + (m-1)]">
          </div>
          <div class="product_name">
            <p>{{productTitleArr[(n-1)*3 + (m-1)]}}</p>
          </div>
          <div class="product_stock">
            <p>{{productSubArr[(n-1)*3 + (m-1)]}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="frame">
      <div class="rule_frame layer"></div>
      <div class="active_frame layer">
        <input type="text" maxlength="10" placeholder="请输入邀请码（已通过短信发送）" class="code_input">
        <p class="commit_btn">确认</p>
        <p class="cancel_btn">取消</p>
      </div>
      <div class="out_frame layer">
        <p class="out_btn">确认</p>
      </div>
      <div class="closebtn"></div>
    </div>

    <div class="reward_frame">
      <div class="reward_product" data-id=''>
        <img src="" alt="" class="reward_product_img">
      </div>
      <p class="reward_product_name"></p>
      <input type="text" class="nameInner" maxlength="10" placeholder="请输入姓名">
      <input type="tel" class="phoneInner" maxlength="11" placeholder="请输入手机号码">
      <input type="text" class="addInner" maxlength="255" placeholder="请输入地址">
      <div class="infoBtn"></div>
    </div>

    <pv :pv-data='pvData'></pv>
    <foot></foot>
  </div>
</template>
<script>
import foot from './../components/footNotice';
import down from './../components/down'
import preload from './../components/preload'
import share from './../components/shareInfo'
import com from './../util/common'
import pv from './../components/pv'
export default {
  name: 'init',
  components: {
    foot,
    down,
    preload,
    share,
    pv
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
      pvData: {
        act_id: com.$_GET('id')
      },
      href: 'https://www.hxsapp.com/download',
      pvshow: true,
      userName: '',
      userPhone: '',

      nowtime: '',

      boxArr: [],
      boxTimeArr: [],
      boxType:{
        act_end: true
      },
      countType: [false, false, false],
      onType: [false, false, false],
      edType: [false, false, false],

      productIdArr: [],
      productTitleArr: [],
      productSubArr: [],
      productImgArr: [],
      productStockArr: [],
      productOutArr: []
    }
  },
  created() {
    for (var i = 0; i < 3; i++) {
      this.boxTimeArr.push({
        count: false,
        on: false,
        ed: false
      })
    }
  },
  mounted() {
    var _this = this

    this.$nextTick(() => {
      this.getNowtime();
    })

    window.appShareCallback = function() {

    }
  },
  methods: {
    getNowtime: function(result) {
      var _this = this
      var callback = '';
      $.getJSON('https://act.hxsapp.com' + '/friSeckill/Main/actInfo?callback=?', _this.json, function(data) {
        _this.nowtime = data.data.ser_time;
        //内部执行读取数据的函数获取当前时间
        _this.loadData();
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
          var boxType = i.substring(11, 13);
          switch (boxType) {
            case '10':
              _this.boxArr.push({ 'shelves_box_1': true })
              break;
            case '12':
              _this.boxArr.push({ 'shelves_box_2': true })
              break;
            case '17':
              _this.boxArr.push({ 'shelves_box_3': true })
              break;
          }

          $.each(j, function(i) {
            if (j[i].stock == '0') {
              _this.productOutArr.push(true)
            } else {
              _this.productOutArr.push(false)
            }

            _this.productIdArr.push(j[i].id)
            _this.productStockArr.push(j[i].stock)
            _this.productImgArr.push(j[i].img)
            _this.productTitleArr.push(j[i].title)
            _this.productSubArr.push(j[i].subtitle)
          })

          if (thisTimeS <= actTimeS) {
            //这个时段活动倒计时了
            _this.countType[count] = true
            _this.boxArr.push({ 'act_end': true })
            // html2 += [
            //   '<div class="secbox sectime">',
            //   '<p>距离活动开始</p>',
            //   '<p class="sectime_timebox">',
            //   '<span class="sectime_day_' + count + '"></span><span>天</span>',
            //   '<span class="sectime_hour_' + count + '"></span><span>时</span>',
            //   '<span class="sectime_min_' + count + '"></span><span>分</span>',
            //   '<span class="sectime_sec_' + count + '"></span><span>秒</span>',
            //   '</p>',
            //   '</div>'
            // ].join('');
            // $(box).find($('.product_box_c')).addClass('product_sec');
            // $(box).find($('.secarea')).html(html2);
            // $(box).addClass('secing');
          } else if (thisTimeS < actTimeS + (1000 * 60 * 60)) {
            //这个时段进行中
            _this.onType[count] = true
            // html2 += ['<div class="secbox secend hotsecbox">',
            //   '<p>火热进行中</p>',
            //   '</div>'
            // ].join('');
            // $(box).find($('.product_box_c')).addClass('product_on');
            // $(box).find($('.secarea')).html(html2);
            // $(box).addClass('act_on');
          } else if (thisTimeS > actTimeS + (1000 * 60 * 60)) {
            //这个时段活动结束了
            _this.edType[count] = true
            // html2 += ['<div class="secbox secend">',
            //   '<p>活动已结束</p>',
            //   '</div>'
            // ].join('');
            // $(box).find($('.product_box_c')).addClass('product_end');
            // $(box).find($('.secarea')).html(html2);
            // $(box).addClass('act_end');
          }
          console.log(count)
          // $.getJSON('https://act.hxsapp.com' + '/friSeckill/Main/actInfo?callback=?', _this.json, function(data) {
          //   var nowtime = data.data.ser_time
          // })
          // _this.timer('.sectime_day_' + count, '.sectime_hour_' + count, '.sectime_min_' + count, '.sectime_sec_' + count, actTimeS, _this.nowtime, box);
        })
        _this.loadTimeLine();
      })
    },
    gettime: function(day, hour, min, sec, endtime, nowtime) {
      var _this = this
      var EndTime = new Date(endtime);
      var NowTime = _this.nowtime;
      var t = EndTime.getTime() - NowTime * 1000;
      var d = 0;
      var h = 0;
      var m = 0;
      var s = 0;
      if (t >= 0) {
        d = Math.floor(t / 1000 / 60 / 60 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
      }
      $(day).text(_this.toDoub(d));
      $(hour).text(_this.toDoub(h));
      $(min).text(_this.toDoub(m));
      $(sec).text(_this.toDoub(s));
    },
    timer: function(day, hour, min, sec, endtime, nowtime, obj) {
      var _this = this
      var timer = window.setInterval(function() {
        if ($(obj).hasClass('act_end')) {
          //console.log('时钟走到了尽头')
          return;
        } else if ($(obj).hasClass('act_on')) {
          //console.log('活动进行中')
          return;
        }
        nowtime++;
        var end = endtime;
        var now = nowtime * 1000;
        if (end < now) {
          var html = ['<div class="secbox secend">',
            '<p>火热进行中</p>',
            '</div>'
          ].join('');
          $(obj).find($('.secarea')).html(html);
        }
        _this.gettime(day, hour, min, sec, endtime, nowtime);
      }, 1000);
    },
    loadTimeLine: function() {
      var _this = this
      var outIcon = '<img src="img/out_icon.png" class="out_icon">';
      $('.stock_0').append(outIcon);
      $('.stock_0').siblings('.product_stock').text('已秒完').css('background-color', '#8d8d8d');

      if ($('.shelves_box1').hasClass('shelves_box_1')) {
        $('.time_line').addClass('time_line_state_2');
      } else if ($('.shelves_box1').hasClass('shelves_box_2')) {
        $('.time_line').addClass('time_line_state_3');
      } else if ($('.shelves_box1').hasClass('shelves_box_3')) {
        $('.time_line').addClass('time_line_state_4');
      } else {
        $('.time_line').addClass('time_line_state_1');
      }
    },
    commitCode: function(good) {
      var _this = this
      // 不需要验证码
      // $('.frame,.layer').hide();
      // $('body').off('touchmove', prevent);
      var rushJson = {
        act_id: com.$_GET('id'),
        model_idfa: com.$_GET('model_idfa'),
        goods_id: good,
      }
      $.getJSON('https://act.hxsapp.com' + '/friSeckill/Main/rush?callback=?', rushJson, function(data) {
        if (data.code == 200) {
          _this.innerInfo(good)
        }
        toastTip('.toast_tip', data.msg, 2000)
      })
    },
    innerInfo: function(good) {
      var _this = this
      var infoJson = {
        act_id: com.$_GET('id'),
        goods_id: good,
        model_idfa: com.$_GET('model_idfa'),
      }
      $('#warp').hide();
      $('.reward_frame').show();
      $.getJSON('https://act.hxsapp.com' + '/friSeckill/Goods/info?callback=?', infoJson, function(data) {
        $('.reward_product_img').attr('src', data.data.img);
        $('.reward_product_name').text(data.data.title);
        $('.reward_product').attr('data-id', data.data.id);
      });
    },
    commitInfo: function(good) {
      var _this = this
      var goodsId = $('.reward_product').attr('data-id');
      if (_this.verification() == false) {
        return false;
      } else {
        var commitInfoJson = {
          goods_id: goodsId,
          act_id: com.$_GET('id'),
          model_idfa: com.$_GET('model_idfa'),
          rece_name: $('.nameInner').val(),
          rece_phone: $('.phoneInner').val(),
          rece_address: $('.addInner').val()
        }
        $.getJSON('https://act.hxsapp.com' + '/friSeckill/Main/receInfo?callback=?', commitInfoJson, function(data) {
          if (data.code == 200) {
            $('.reward_frame').hide();
            $('#warp').show();
            $('.nameInner').val('');
            $('.phoneInner').val('');
            $('.addInner').val('');
          }
          toastTip('.toast_tip', data.msg, 2000)
        });
      }
    },
    verification: function() {
      var _this = this
      var goodsId = $('.reward_product').attr('data-id');
      var chinese = new RegExp(/^([\u4E00-\u9FA5|a-zA-Z])+$/);
      var mobile = new RegExp(/0?(13|14|15|17|18)[0-9]{9}/);

      var innerName = $('.nameInner').val();
      var innerPhone = $('.phoneInner').val();

      var chineseReg = chinese.test(innerName);
      var mobileReg = mobile.test(innerPhone);

      var commitInfoJson = {
        goods_id: goodsId,
        act_id: com.$_GET('id'),
        model_idfa: com.$_GET('model_idfa'),
        rece_name: $('.nameInner').val(),
        rece_phone: $('.phoneInner').val(),
        rece_address: $('.addInner').val()
      }
      if ($('.nameInner').val() == '') {
        toastTip('.toast_tip', '请输入姓名', 1000);
        return false;
      } else if ($('.phoneInner').val() == '') {
        toastTip('.toast_tip', '请输入手机号码', 1000);
        return false;
      } else if ($('.addInner').val() == '') {
        toastTip('.toast_tip', '请输入地址', 1000);
        return false;
      } else if (!chineseReg) {
        toastTip('.toast_tip', '请输入带中文或26个英文字母的字符', 1000);
        return false
      } else if (!mobileReg) {
        toastTip('.toast_tip', '您输入的手机号码有误', 1000);
        return false
      }
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
  background: url(./../assets/img/seckill/bg.jpg) top left no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 78rem;
  position: relative;
  min-width: 300px;
}

.topbox {
  width: 100%;
  height: 23.33rem;
  position: relative;
}

.rule_icon {
  width: 6.47rem;
  height: 1.56rem;
  top: 20.77rem; // left: calc(~'50% - 3.23rem');
  position: absolute;
  background: url(./../assets/img/seckill/rule_icon.png) top left no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  .center(6.47rem)
}

.time_line {
  width: 19.67rem;
  height: 2.9rem;
  left: calc(~'50% - 9.83rem');
  top: 16.67rem;
  position: absolute;
}

.time_line_state_1 {
  background: url(./../assets/img/seckill/timeline_1.png) top left no-repeat;
  background-size: 100% 100%;
}

.time_line_state_2 {
  background: url(./../assets/img/seckill/timeline_2.png) top left no-repeat;
  background-size: 100% 100%;
}

.time_line_state_3 {
  background: url(./../assets/img/seckill/timeline_3.png) top left no-repeat;
  background-size: 100% 100%;
}

.time_line_state_4 {
  background: url(./../assets/img/seckill/timeline_4.png) top left no-repeat;
  background-size: 100% 100%;
}

.shelves_box {
  margin: 0 .5rem 1rem .5rem;
  width: calc(~'100% - 1rem');
  height: 16.73rem;
}

.shelves_box_1 {
  background: url(./../assets/img/seckill/shelves_1.png) top left no-repeat;
  background-size: 100% 100%;
}

.shelves_box_2 {
  background: url(./../assets/img/seckill/shelves_2.png) top left no-repeat;
  background-size: 100% 100%;
}

.shelves_box_3 {
  background: url(./../assets/img/seckill/shelves_3.png) top left no-repeat;
  background-size: 100% 100%;
}

.secend {
  font-size: .8rem;
  color: #FFF;
  background-color: rgba(0, 0, 0, .75);
  padding: .5rem 1rem;
  border-radius: 2rem;
  display: inline-block;
  float: right;
  margin: 1rem .7rem 0 0;
}

.secarea {
  height: 3.6rem;
  width: 100%;
  margin-bottom: 5px;
}

.sectime {
  float: right;
  margin: 1rem .7rem 0 0;
  font-size: .8rem;
  color: #FFF;
  text-align: center
}

.sectime_timebox span:nth-child(odd) {
  background-color: #ff7a3d;
  padding: 0 .2rem;
}

.product_box {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
}

.product_box_c {
  height: 11.67rem;
  width: 7.3rem;
  text-align: center;
  font-size: .8rem;
  /*margin-left: .5rem;*/
  cursor: pointer;
}

.product_img {
  width: 100%;
  height: calc(~'100% - 3rem');
  /*background-color: #0F2540;*/
  position: relative;
  cursor: pointer;
}

.product_img img {
  width: 100%;
  height: 100%;
}

.out_icon {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.product_name {
  width: 100%;
  height: 1.5rem;
  background-color: #FFF;
  color: #8d8d8d;
  line-height: 1.5rem;
  overflow: hidden;
}

.product_stock {
  width: 100%;
  height: 1.5rem;
  background-color: #ef2932;
  color: #fff;
  line-height: 1.5rem;
  overflow: hidden;
}

.product_stock_2 {
  width: 100%;
  height: 1.5rem;
  background-color: #8d8d8d;
  color: #fff;
  line-height: 1.5rem;
  overflow: hidden;
}

.frame {
  background: rgba(0, 0, 0, .75) top left no-repeat;
  background-size: 100% 100%;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 10;
  display: none;
}

.closebtn {
  background: url(./../assets/img/seckill/close.png) top left no-repeat;
  background-size: 100% 100%;
  top: 14.35rem;
  right: .5rem;
  height: 2.53rem;
  width: 2.53rem;
  position: absolute;
  z-index: 12;
  cursor: pointer;
}

.rule_frame {
  background: url(./../assets/img/seckill/rule_layer.png) top left no-repeat;
  background-size: 100% 100%;
  top: 15.67rem;
  left: calc(~'50% - 10.265rem');
  height: 20.2rem;
  width: 20.53rem;
  position: absolute;
  z-index: 11;
  display: none;
}

.active_frame {
  background: url(./../assets/img/seckill/active_layer.png) top left no-repeat;
  background-size: 100% 100%;
  top: 15.67rem;
  left: calc(~'50% - 10.265rem');
  height: 10rem;
  width: 20.53rem;
  position: absolute;
  z-index: 11;
  display: none;
}

.out_frame {
  background: url(./../assets/img/seckill/out_layer.png) top left no-repeat;
  background-size: 100% 100%;
  top: 15.67rem;
  left: calc(~'50% - 10.265rem');
  height: 10rem;
  width: 20.53rem;
  position: absolute;
  z-index: 11;
  display: none;
}

.code_input {
  outline: none;
  background: none;
  border: 1px solid #CCC;
  padding: .2rem 1rem;
  border-radius: 20px;
  width: 12.5rem;
  overflow: hidden;
  position: absolute;
  top: 4rem;
  left: calc(50% - 6.8rem);
}

.commit_btn {
  color: #FFF;
  background-color: #8530e9;
  padding: .2rem 1rem;
  font-size: 1rem;
  border-radius: 20px;
  position: absolute;
  top: 7.4rem;
  left: 6rem;
  cursor: pointer;
}

.cancel_btn {
  color: #FFF;
  background-color: #9ba0a8;
  padding: .2rem 1rem;
  font-size: 1rem;
  border-radius: 20px;
  position: absolute;
  top: 7.4rem;
  left: 11.2rem;
  cursor: pointer;
}

.out_btn {
  color: #FFF;
  background-color: #8530e9;
  padding: .2rem 1rem;
  font-size: 1rem;
  border-radius: 20px;
  position: absolute;
  top: 6rem;
  left: calc(50% - 2rem);
  cursor: pointer;
}

.reward_frame {
  background: url(./../assets/img/seckill/rewardbg.jpg) top left no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 44.5rem;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 300px;
  display: none;
}

.reward_product {
  /*background: url(./../assets/img/seckill/rewardbg.jpg) top left no-repeat;*/
  background-size: 100% 100%;
  width: 6.66rem;
  height: 8.33rem;
  position: absolute;
  top: 8.33rem;
  left: calc(~'50% - 3.33rem');
}

.reward_product img {
  width: 100%;
  height: 100%;
}

.reward_product_name {
  position: absolute;
  width: 100%;
  top: 17.16rem;
  text-align: center;
}

.reward_frame input {
  outline: none;
  border: none;
  line-height: 1.33rem;
  height: 1.33rem;
  width: 16rem;
  position: absolute;
  left: 6.6rem;
}

.nameInner {
  top: 24.4rem;
}

.phoneInner {
  top: 27.6rem;
}

.addInner {
  top: 30.9rem;
}

.infoBtn {
  background: url(./../assets/img/seckill/commitBtn.png) top left no-repeat;
  background-size: 100% 100%;
  width: 11.83rem;
  height: 3rem;
  position: absolute;
  top: 38.5rem;
  left: calc(~'50% - 5.91rem');
  cursor: pointer;
}

.hotsecbox {
  background-color: #ef2932;
}
</style>

