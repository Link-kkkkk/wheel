<template>
  <div class="warp">
    <transition name='switch'>
      <div class="infoPage" v-show='infoPage'>
        <div class="headBg"></div>
        <div class="textboxBg_1"></div>
        <div class="textboxBg_2"></div>
        <div class="head" v-show='!userIn'></div>
        <div class="inHead" v-show='userIn'>
          <img :src='userHeadImg'>
        </div>
        <div class="textBox">
          <p>{{loseText}}</p>
        </div>
        <div class="textBox_2">
          <p>您的成绩:{{grade}}</p>
          <p>击败全国{{percent}}的用户</p>
        </div>
        <div class="textBox_3">
          <p>最佳成绩为:{{bestGrade}}</p>
          <p>最佳排名为:{{bestRank}}</p>
        </div>
        <div class="playBtn" @click='backGame'></div>
        <div class="rankBtn" @click='switchPage(1)'></div>
        <div :class="drawBtn" @click='goDraw'></div>
      </div>
    </transition>
    <transition name='switch'>
      <div class="rankPage" v-show="!infoPage">
        <div class="closeBtn" @click='switchPage(2)'></div>
        <div :class="titleBtn_1" @click='switchRank("rule")'></div>
        <div :class="titleBtn_2" @click='switchRank("rank")'></div>
        <!-- <button  @click='switchPage(2)'>back to homepage</button> -->
        <div v-show="ruleshow">
          <div class="ruleTextBox">
            <p>1.活动时间：10月1日-10月9日</p>
            <p>2.点击两个相同头像即可消灭，每消灭一次可得10分。</p>
            <p>3.第一关超过100分可成功进入第二关，第二关超过60分可进入排名榜。根据两关挑战分数累计排名，排名前50可得享瘦大礼一份。</p>
            <p>第1名可获得一套运动套装</p>
            <p>第2名可获得一款运动双肩包</p>
            <p>第3名可获得瑜伽垫套餐</p>
            <p>第4-10名可获得一张全国通用电影票</p>
            <p>第11-30名可获得30M三网流量</p>
            <p>第31-50名可获得10M三网流量</p>
            <p>4.领取的流量将在活动结束后3个工作日内充值，以短信形式通知充值成功；</p>
            <p>5.中奖奖品：工作人员在活动结束后3个工作日内以电话形式与中奖者联系确认，确认信息后3个工作日内邮寄。</p>
          </div>
        </div>
        <div v-show="!ruleshow">
          <div class="srankBoxTit">
            <p class="userRank">您的当前排名:{{bestRank}}</p>
            <div class="srankTit"></div>
          </div>
          <div class="srankBox">
            <div class="rankList" v-for='(data,index) in rankNameArr' :key='index'>
              <p>{{index + 1}}</p>
              <div class="userHead">
                <img :src='rankImgArr[index]'>
              </div>
              <p>{{rankNameArr[index]}}</p>
              <p>{{rankGradeArr[index]}}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'init',
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
      },
      href: 'https://www.hxsapp.com/download',
      userHeadImg: '',
      loseText: '挑战失败',
      grade: 0,
      percent: '50%',
      bestGrade: 0,
      bestRank: 'NO.521',
      use:'',
      userIn: false,
      infoPage: true,
      titleBtn_1: {
        'btn_1': false,
        'btn_1_on': true
      },
      titleBtn_2: {
        'btn_2': true,
        'btn_2_on': false
      },
      drawBtn: {
        'drawBtn': true,
        'drawBtn_on': false
      },
      canGoDraw: true,
      ruleshow: true,
      rankArr: [],
      rankImgArr: [],
      rankNameArr: [],
      rankGradeArr: [],
    }
  },
  mounted() {
    var _this = this;
    this.$common.actjs.resizeWindow();
    this.$common.actjs.init(this.href);
    this.$common.common.preLoading("stressing");

    this.$nextTick(function() {
      var clientH = document.documentElement.clientHeight;
      $('html,body,.warp,.infoPage,.rankPage').css('height', clientH + 'px');
      $('.btn_1,.btn_2,.btn_1_on,.btn_2_on').css('top', clientH / 10.5 + 'px')
      $('.srankBoxTit').css('top', (clientH * 210) / 1200 + 'px')
      $('.srankBox').css({
        'top': (clientH * 330) / 1200 + 'px',
        'height': (clientH * 700) / 1200 + 'px'
      })
      // $('html,body,.warp,.infoPage,.rankPage').css('height', '40.2rem');
      if (_this.$parent.$data.json.id) {
        _this.json = _this.$parent.$data.json
      }
      if (_this.$route.params.data) {
        _this.getParams()
      }
      if (_this.$common.common.$_GET('sess_token').length > 10) {
        _this.userIn = true
      }

      _this.share()
      _this.savePoint()
      setTimeout(function(){
        _this.getWinnerList()
      },200)
    })
  },
  methods: {
    getParams() {
      var _this = this
      if (!_this.$parent.$data.json) {
        _this.canGoDraw = false
        return
      }
      //记得改回160分过关
      if (_this.$parent.$data.json.gamePoint >= 160) {
        _this.loseText = '挑战成功'
        _this.drawBtn = {
          'drawBtn': false,
          'drawBtn_on': true
        }
        _this.canGoDraw = true
      } else {
        _this.loseText = '挑战失败'
        _this.drawBtn = {
          'drawBtn': true,
          'drawBtn_on': false
        }
        _this.canGoDraw = false
      }

      var point = _this.$parent.$data.json.gamePoint
      _this.grade = point + '分'
      // _this.bestGrade = point + '分'
      // _this.percent = '52%'
    },
    share() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/feedbackGift/Mod/actInfo', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            this.$common.actjs.shareFun(data.data.data, _this.$common.common._ACTHOST + '/html/linkup/dist/index.html?rute=game&id=' + _this.json.act_id);
            _this.pageTitle = data.data.data.title
            document.title = data.data.data.title
          }
        })
    },
    backGame() {
      var _this = this
      if(_this.$parent.$data.json.shareType = true){
        _this.outSideBack()
      }else{
        _this.inSideBack()
      }
    },
    inSideBack() {
      var _this = this
      this.$router.replace({
        name: 'game',
        params: {
          data: _this.json,
          backTo: true
        },
        query: {
          sess_token: _this.json.sess_token,
          id: _this.json.act_id
        }
      })
    },
    outSideBack (){
      var _this = this
      this.$router.replace({
        name: 'game',
        params: {
          data: _this.json,
          backTo: true
        },
        query: {
          sess_token: _this.json.sess_token,
          id: _this.json.act_id,
          shareType : 1
        }
      })
    },
    switchPage(page) {
      var _this = this
      if (page == 1) {
        _this.infoPage = false
      } else if (page == 2) {
        _this.infoPage = true
      }
    },
    switchRank(type) {
      var _this = this
      if (type == 'rule') {
        _this.titleBtn_1 = {
          'btn_1': false,
          'btn_1_on': true
        }
        _this.titleBtn_2 = {
          'btn_2': true,
          'btn_2_on': false
        }
        _this.ruleshow = true
      } else if (type == 'rank') {
        _this.titleBtn_1 = {
          'btn_1': true,
          'btn_1_on': false
        }
        _this.titleBtn_2 = {
          'btn_2': false,
          'btn_2_on': true
        }
        _this.ruleshow = false
      }
    },
    goDraw() {
      var _this = this

      if (!_this.$route.params.data) {
        var routeData = _this.$parent.$data.json
      } else {
        var routeData = _this.$route.params.data
      }

      if (routeData.shareType || this.$common.common.$_GET('shareType')) {
        window.location.href = _this.href
        return false
      }

      var token = _this.$common.common.$_GET('sess_token');
      var locationType = window.location.search.indexOf('sess_token');
      if (token && token.length < 10 || (locationType != -1 && !token)) {
        _this.$common.common.toastTip('.toast_tip', '需要登录才能抽奖哦！', 1000)
        setTimeout(function() {
          window.location.href = 'https://hxsapp_showloginpage';
        }, 1000)
        return false
      }

      if (!_this.canGoDraw) {
        _this.$common.common.toastTip('.toast_tip', '需要挑战成功才能抽奖哦！', 1500)
        return
      }

      var routeData = {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
      }
      this.$router.replace({
        name: 'olduserDraw',
        params: {
          data: _this.json
        },
        query: {
          sess_token: _this.json.sess_token,
          id: _this.json.act_id,
        }
      })
    },
    savePoint() {
      var _this = this
      var saveData = {
        sess_token: _this.json.sess_token,
        act_id: _this.json.act_id,
        score: _this.grade
      }
      if (_this.$common.common.$_GET('sess_token').length > 10) {
        this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/saveUserScore', { params: saveData })
          .then(function(data) {
            if (data.data.code == 200) {
              _this.percent = data.data.data.range
              _this.bestGrade = data.data.data.optimum_score
              _this.bestRank = 'NO.' + data.data.data.optimum_ranking
            }
          })

        this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/getUserHeadImg', { params: _this.json })
          .then(function(data) {
            if (data.data.code == 200) {
              _this.userHeadImg = data.data.data.head_img
            }
          })
      } else {
        _this.percent = '52%'
        _this.bestGrade = _this.grade
        _this.bestRank = 'NO.521'
      }
    },
    getWinnerList() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/rankings', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            for (var i = 0; i < data.data.data.length; i++) {
              _this.rankNameArr.push(_this.subStlength(data.data.data[i].nickname, 4, 4))
              _this.rankGradeArr.push(data.data.data[i].score)
              _this.rankImgArr.push(data.data.data[i].head_img)
            }
          }
        })
    },
    subStlength(str, maxLength, targetLength) {
      if (str) {
        var reg = /^[A-Za-z]+$/;
        var re = /^[0-9a-zA-Z]*$/g;
        if (reg.test(str) || re.test(str)) {
          if (str.length > 2 * maxLength) str = str.substring(0, 2 * targetLength) + '...';
        } else {
          if (str.length > maxLength) str = str.substring(0, targetLength) + '...';
        }
      }
      return str;
    },
  },
  watch: {
    '$route': 'getParams()'
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
@import './../assets/common/rank.less';
</style>