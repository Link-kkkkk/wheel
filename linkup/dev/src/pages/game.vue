<template>
  <div class="warp" id="gameBox">
    <reset :data='resetData' @listenMock='__resetListen'></reset>
    <!-- <div class='pv' v-if='pvshow'>
                    <p>{{pvnum}}</p>
                  </div> -->
  </div>
</template>
<script>
import Vue from 'vue'
import reset from './../components/reset'

var rootUrl;
var headUrl;
if (process.env.NODE_ENV === 'production') {
  rootUrl = 'https://act.hxsapp.com/html/linkup/dist/static/source/img/'
  headUrl = 'https://act.hxsapp.com/html/linkup/dist/static/source/img/head/'
} else {
  rootUrl = '../static/source/img/'
  headUrl = '../static/source/img/head/'
}

// 引擎初始化
function gameEngine(vue, vueData) {
  var game = new Phaser.Game(750, 1200, Phaser.CANVAS, 'gameBox');
  var clientH = document.documentElement.clientHeight;
  // 舞台对象
  game.States = {};
  var _vue = vue
  var _vuedata = vueData
  var _gameStateBoot = game.States.boot
  var _gameStatePre = game.States.preload

  game.States.boot = function() {
    //状态初始化
    this.preload = function() {
      if (typeof (GAME) !== "undefined") {
        this.load.baseURL = GAME + "/";
      }
      if (!game.device.desktop) {
        // //非桌面模式刷新大小
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.scale.forcePortrait = true;
        this.scale.refresh();
      }

      //第一幕预加载画面的资源在这里优先加载
      game.load.image('loadBg', rootUrl + 'bg.jpg')
      game.load.image('loadLine', rootUrl + 'loadingLine.png')
      game.load.image('loadLineIn', rootUrl + 'loadline.png')
    };
    this.create = function() {
      //预加载
      game.state.start('preload');
    };
  };

  game.States.preload = function(game) {
    this.init = function() {

    }

    this.preload = function() {
      game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      // 资源加载 (预加载画面以外的资源在这里加载)
      game.load.image('testBtn', rootUrl + 'start-button.png')
      game.load.audio('bgSound', rootUrl + 'bg.mp3');
      //第二幕
      game.load.image('startTitle', rootUrl + 'startTitle.png')
      game.load.image('startupbg', rootUrl + 'startBg.jpg')
      game.load.image('startBtn', rootUrl + 'startBtn.png')
      game.load.image('ruleBtn', rootUrl + 'ruleBtn.png')
      game.load.image('ruleBox', rootUrl + 'ruleLayer.png')
      game.load.image('close_2', rootUrl + 'close_3.png')
      //第三幕
      for (var i = 1; i < 25; i++) {
        game.load.image('ani_' + i, headUrl + 'sprite_' + i + '.png')
      }
      game.load.image('ani_1', rootUrl + 'sprite_1.png')
      game.load.image('ani_2', rootUrl + 'sprite_2.png')
      game.load.image('ani_3', rootUrl + 'sprite_3.png')
      game.load.image('ani_4', rootUrl + 'sprite_4.png')
      console.log(rootUrl + 'sprite_4.png')
      game.load.image('gameBg', rootUrl + 'gameBg.jpg')
      game.load.image('gamePoint', rootUrl + 'gamePoint.png')
      game.load.image('winBox', rootUrl + 'layer_win.png')
      game.load.image('close', rootUrl + 'close.png')
      game.load.image('again', rootUrl + 'btn_1.png')
      game.load.image('continue', rootUrl + 'btn_5.png')
      game.load.image('headmask', rootUrl + 'headMask.png')

      //请求头像
      if (_vue.$common.common.$_GET('sess_token').length > 10) {
        _vue.$http.jsonp(_vue.$common.common._ACTHOST + '/eliminateMusic/Mod/getUserHeadImg', { params: _vue.json })
          .then(function(data) {
            if (data.data.code == 200) {
              game.load.image('head', data.data.data.head_img)
            } else {
              game.load.image('head', rootUrl + 'head.png')
            }
          })
      } else {
        game.load.image('head', rootUrl + 'head.png')
      }
      //加载条
      var worldW = document.body.clientWidth;
      var worldH = document.body.clientHeight;
      game.world.setBounds(0, 0, game.width, game.height);
      // var loadbgWidth = game.cache.getImage('loadBg').width;
      // var loadbgHeight = game.cache.getImage('loadBg').height;
      var loadBg
      loadBg = game.add.image(0, 0, 'loadBg');
      loadBg.anchor.set(0);
      loadBg.width = game.world.width;
      loadBg.height = game.world.height;

      var loadText, loadTextStyle;
      var loadLine, loadCompleteLine, loadCompleteLineStyle;
      loadTextStyle = {
        fill: '#f4d4ff',
        fontSize: '24px',
        fontWeight: '200'
      }
      loadText = game.add.text(game.world.centerX, 615, '享瘦消消乐 游戏正在加载中...', loadTextStyle);
      loadText.anchor.setTo(.5)
      loadLine = game.add.image(game.world.centerX, 530, 'loadLine')
      loadLine.anchor.setTo(.5)
      var loadLineH = game.cache.getImage('loadLine').height;

      loadCompleteLine = game.add.image(188, 505, 'loadLineIn')
      loadCompleteLine.width = 10
      var loadCompleteLineLong = game.cache.getImage('loadLineIn').width;

      var progress = 0
      // var timer = setInterval(function() {
      //   progress++
      //   if (progress >= 100) {
      //     clearInterval(timer)
      //     game.state.start('startup');
      //   }
      //   loadCompleteLine.width = 370 * (progress / 100)
      // }, 10)

      game.load.onFileComplete.add(function(progress) {
        loadCompleteLine.width = 370 * (progress / 100)
        if (progress == '100') {
          game.state.start('startup');
        }
      });
    };

    this.create = function() {

    }
  }

  game.States.startup = function(game) {
    var ruleGroup

    this.init = function() {

    }

    this.preload = function() {
      game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    }

    this.create = function() {
      var _this = this
      var worldW = document.body.clientWidth;
      var worldH = document.body.clientHeight;
      var startupBg, startTitle, startTitleAni;
      startupBg = game.add.image(0, 0, 'startupbg')
      startupBg.width = game.world.width;
      startupBg.height = game.world.height;
      startTitle = game.add.image(76, 200, 'startTitle')
      // startTitle.anchor.set(0.5);
      startTitleAni = game.add.tween(startTitle);
      startTitleAni.from({ x: game.world.centerX, width: 0, height: 0 }, 3000, Phaser.Easing.Bounce.Out, true);

      game.world.setBounds(0, 0, game.width, game.height);

      //开始游戏
      var startBtn;
      startBtn = game.add.button(260, 726, 'startBtn', function() {
        goMain()
      }, game, 0, 0, 3, 0);

      function goMain() {
        //游戏状态监测
        var token = _vue.$common.common.$_GET('sess_token');
        var locationType = window.location.search.indexOf('sess_token');
        _vue.$http.jsonp(_vue.$common.common._ACTHOST + '/eliminateMusic/Mod/actState', { params: _vue.json })
          .then(function(data) {
            if (data.data.code == 200) {
              if (!_vue.$common.common.$_GET('shareType') || _vue.$parent.$data.json.shareType == true) {
                if (token.length < 10) {
                  window.location.href = 'https://hxsapp_showloginpage';
                } else {
                  _vue.$common.common.buriedPoint('开始游戏', '开始游戏');
                  $('.pv,.d_foot').hide();
                  game.state.start('main');
                }
              } else {
                _vue.$common.common.buriedPoint('开始游戏', '开始游戏');
                $('.pv,.d_foot').hide();
                game.state.start('main');
              }
            } else {
              _vue.$common.common.toastTip('.toast_tip', data.data.msg, 1500);
            }
          })
      }

      var ruleBtn;
      ruleBtn = game.add.button(594, 36, 'ruleBtn', function() {
        _this.showRule()
      }, game, 0, 0, 3, 0);
    }

    this.update = function() {

    }

    this.showRule = function() {
      this.ruleGroup = game.add.group()
      var ruleBox = this.ruleGroup.create(game.world.centerX, 550, 'ruleBox')
      ruleBox.anchor.set(.5)
      this.ruleGroup.addChild(ruleBox)

      var closeBtn = game.add.button(620, 170, 'close_2', closeLayer, this, null, null, null, null, this.ruleGroup)
      // closeBtn.anchor.set(.5)
      closeBtn.scale.setTo(1.5)
      function closeLayer() {
        //其实一个元素只能进入一个组
        this.ruleGroup.destroy();
      }
    }
  }

  game.States.main = function(game) {
    var _this = this
    var tapIcon, iconGroup, iconBtnGroup;
    var tapIconAnimate;
    var outimgArr = []
    for (var i = 1; i < 25; i++) {
      outimgArr.push('ani_' + i)
    }
    // var outimgArr = ['ani_1', 'ani_2', 'ani_3', 'ani_4'];
    // 交互参数
    var lockNum = 0;
    var iconArr = [];
    var newIcon, newIconGroup;
    var newIconArr = [],
      newIconArrLeft = [],
      newIconArrTop = [];
    //补间动画
    var lockTween, boomTween;
    var bgMusic
    //弹窗
    var loseLayer
    //游戏地图
    var map_1 = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]
    //游戏分数
    var point = 0;
    var sendPoint = 0;
    var winPoint = 100;
    var stage = 1;
    //游戏时间
    var mianTimer
    var timeCount = 0;
    //流程工具
    var gameStop = false
    var gameEnd = false
    this.preload = function() {
      game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    };

    this.create = function() {
      // this.endGame()
      var worldW = document.body.clientWidth;
      var worldH = document.body.clientHeight;
      var re = worldW / 25
      game.world.setBounds(0, 0, game.width, game.height);

      var gameBg
      gameBg = game.add.image(0, 0, 'gameBg');
      gameBg.anchor.set(0);
      gameBg.width = game.world.width;
      gameBg.height = game.world.height;

      //装载背景音乐
      if (stage == 1) {
        bgMusic = game.add.sound('bgSound');
        bgMusic.loop = true;
        bgMusic.volume = .5;
        bgMusic.play();
      }

      //渲染
      this.UIrender()
      this.gamePoint(0)
      this.createIcon()
      if(stage == 1){
        this.clockTimer(30)
      }else{
        this.clockTimer(15)
      }
    };
    this.update = function() {
      if (timeCount <= 0) {
        if (gameStop) {
          return false
        }
        this.winCheck()
      }
    };
    this.render = function() { };
    this.gamePoint = function(point) {
      if (gameStop) { return }
      var pointLine = game.add.image(298, 28, 'gamePoint')
      var pointLong = point
      if (stage == 1) {
        if (pointLong > 100) {
          pointLong = 100
        }
        pointLine.width = pointLong * 2.4
      } else if (stage == 2) {
        if (pointLong > 60) {
          pointLong = 60
        }
        pointLine.width = pointLong * 4
      }
    }

    // 生成图标
    this.createIcon = function() {
      // var _this = this
      game.physics.startSystem(Phaser.Physics.ARCADE);
      //循环生成游戏图标
      iconGroup = game.add.group();
      iconBtnGroup = game.add.group();
      newIconGroup = game.add.group();

      iconGroup.enableBody = true;
      // iconGroup.physicsBodyType = Phaser.Physics.ARCADE;
      iconBtnGroup.enableBody = true;
      // iconBtnGroup.physicsBodyType = Phaser.Physics.ARCADE;
      newIconGroup.enableBody = true;
      // newIconGroup.physicsBodyType = Phaser.Physics.ARCADE;
      for (var i = 0; i < map_1.length; i++) {
        for (var j = 0; j < map_1[i].length; j++) {
          var randomOuter = _this.random(24);
          var outimg = outimgArr[randomOuter];

          tapIcon = iconGroup.create(145 + (116 * j), 350 + (116 * i), outimg);
          tapIcon.width = 100
          tapIcon.height = 100
          tapIcon.anchor.setTo(.5)
          tapIconAnimate = tapIcon.animations.add('play');
          tapIconAnimate.play(15, true);

          // tapIcon.collideWorldBounds = true
          // tapIcon.body.bounce.y = 0;
          // tapIcon.body.velocity.set(0, 200);
          tapIcon.body.moves = false;

          tapIcon.inputEnabled = true;
          tapIcon.events.onInputUp.add(_this.lock);
          game.physics.arcade.collide(iconGroup);
        }
      }

      iconGroup.setAll('body.collideWorldBounds', true);
      newIconGroup.setAll('body.collideWorldBounds', true);
    };

    // 点击
    this.lock = function(item) {
      if (gameStop) { return }
      iconArr.push(item)
      lockNum++
      newIconArrLeft.push(item.left)
      newIconArrTop.push(item.top)
      _this.rolling(iconArr[0], lockNum)

      if (lockNum >= 2) {
        for (var i = 0; i < iconArr.length; i++) {
          if (iconArr[i].z === iconArr[i + 1].z) {
            reback(i)
          } else if (iconArr[i].key === iconArr[i + 1].key) {
            _this.killing(iconArr[i], _this, i)
            _this.killing(iconArr[i + 1], _this, i + 1)
            iconArr = []
            newIconArrLeft = [];
            newIconArrTop = [];
          } else {
            reback(i)
          }
        }
        lockNum = 0;
      }

      function reback(i) {
        iconArr[i].alpha = 1;
        iconArr[i + 1].alpha = 1;
        iconArr = [];
        newIconArrLeft = [];
        newIconArrTop = [];
        lockNum = 0;
      }
    };

    // 重新生成
    this.refreash = function(left, top) {
      var outimgArr = [];
      for (var i = 1; i < 25; i++) {
        outimgArr.push('ani_' + i)
      }
      var randomOuter = _this.random(24);
      var outimg = outimgArr[randomOuter];
      newIcon = newIconGroup.create(left + 50, top + 50, outimg);
      newIcon.width = 100
      newIcon.height = 100
      newIcon.anchor.setTo(.5)
      var newIconAnimate = newIcon.animations.add('play');
      newIconAnimate.play(15, true);

      newIcon.body.moves = false;

      newIcon.inputEnabled = true;
      newIcon.events.onInputUp.add(_this.lock);
    };

    // 其他UI
    this.UIrender = function() {
      var stageNum = '第' + stage + '关'
      var stageTextStyle = {
        font: '26px PingFang SC',
        fill: '#FFF'
      }
      var stageText = game.add.text(605, 22, stageNum, stageTextStyle)
      // var headimg = game.add.image(66, 25, 'head')
      // // headimg.anchor.setTo(.5)
      // headimg.width = 137
      // headimg.height = 137
      // headimg.radius = 50

      // 蒙版写圆...暂时无解只能这样
      var bmd = game.make.bitmapData(206, 206);
      bmd.alphaMask('head', 'headmask', {
        x: -4,
        y: 0,
        width: 150,
        height: 150
      }, {
          x: 0,
          y: 0,
          width: 142,
          height: 142
        });
      game.add.image(63, 25, bmd)
    }

    // 时间
    this.clockTimer = function(time) {
      var clockTextStyle = {
        font: '76px pingfangSC',
        fontWeight: 'bold',
        fill: '#ffe72e'
      }
      timeCount = time
      var clockText = game.add.text(game.world.centerX + 10, 130, timeCount, clockTextStyle)
      clockText.anchor.setTo(.5)

      function clockInter() {
        timeCount--
        clockText.setText(timeCount)
      }

      // 挂载主定时器
      mianTimer = game.time.events.loop(Phaser.Timer.SECOND, clockInter, this);
    }

    // 流程控制
    this.winCheck = function() {
      game.time.reset();
      gameStop = true
      if (stage > 1) {
        winPoint = winPoint * 0.6
      }
      if (point >= winPoint) {
        if (stage == 1) {
          stage++
          _this.loseToast(0)
        } else {
          sendPoint += point
          var sendData = {
            'win': true,
            'point': sendPoint
          }
          this.endGame(sendData)
        }
      } else {
        sendPoint += point
        var sendData = {
          'win': false,
          'point': sendPoint
        }
        this.endGame(sendData)
      }
    }

    this.endGame = function(sendData) {
      // 移除定时器，干掉引擎
      // game.time.removeAll(mianTimer);
      // 既然都干掉引擎了还管定时器干嘛
      this.gameEnd = true
      // game.destroy(true);
      bgMusic.stop()

      _vue.$parent.$data.json.gamePoint = sendData.point
      if (_vue.$common.common.$_GET('shareType')) {
        _vue.$parent.$data.json.shareType = true
      } else {
        _vue.$parent.$data.json.shareType = false
      }
      _vue.$router.push({
        name: 'rank',
        params: {
          data: _vuedata,
          gameData: sendData,
          actId: _vuedata.act_id
        },
        query: {
          sess_token: _vuedata.sess_token,
          id: _vuedata.act_id
        }
      })
    }

    // 补间动画
    // 消除头像
    this.killing = function(obj, parent, index) {
      var _obj = obj
      var left = newIconArrLeft[index];
      var top = newIconArrTop[index]
      var killTween, killTween2;
      killTween = game.add.tween(obj).to({ width: 0, height: 0, alpha: 0 }, 500, Phaser.Easing.Bounce.Out, true);
      killTween.onComplete.add(tweenEnd, this)

      function tweenEnd() {
        _obj.kill()
        parent.refreash(left, top);
        point += 5
        _this.gamePoint(point)
      }
    };
    // 弹窗
    this.loseToast = function(type) {
      this.loseLayer = game.add.group();
      //蒙版
      var graphics = game.add.graphics(0, 0);
      this.loseLayer.addChild(graphics)
      //直接给画板alpha会造成同层其他元素也透明
      //graphics.alpha = .75;
      graphics.beginFill('0x000000', .75);
      graphics.drawRect(0, 0, game.camera.width, game.camera.height);
      graphics.endFill();
      graphics.z = 5
      if (type == 0) {
        var loseBox = this.loseLayer.create(game.world.centerX, 500, 'winBox')
        loseBox.anchor.set(.5)
        this.loseLayer.addChild(loseBox)

        var pointStyle = {
          font: '48px pingfangSC',
          fontWeight: 'bold',
          fill: '#FFF'
        }
        var pointText = game.add.text(game.world.centerX + 55, 390, point, pointStyle)
        pointText.anchor.setTo(.5)
        this.loseLayer.addChild(pointText)

        var continueBtn = game.add.button(game.world.centerX, 680, 'continue', nextStage, this, null, null, null, null, this.loseLayer)
        continueBtn.anchor.set(.5)

        // var closeBtn = game.add.button(game.world.centerX, 900, 'close', closeLayer, this, null, null, null, null, this.loseLayer)
        var closeBtn = game.add.button(game.world.centerX, 900, 'close', nextStage, this, null, null, null, null, this.loseLayer)
        closeBtn.anchor.set(.5)
      } else if (type == 1) {

      }

      var loseTween = game.add.tween(this.loseLayer)
      loseTween.from({ y: -500 }, 500, Phaser.Easing.Bounce.Out, true)

      function closeLayer() {
        //其实一个元素只能进入一个组
        this.loseLayer.destroy();
      }
      function nextStage() {
        //初始化数据
        gameStop = false
        sendPoint += point
        point = 0
        winPoint = 60
        game.state.start('main');
      }
    }
    //旋转对象
    this.rolling = function(obj, locknum) {
      if (!locknum) {
        locknum == 1;
      }
      if (lockNum == 1) {
        lockTween = game.add.tween(obj)
          .to({ angle: 360 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, false)
          .start();
      } else {
        lockTween.pause();
        lockTween = game.add.tween(obj)
          .to({ angle: 0 }, 100, Phaser.Easing.Linear.None, true, 0, 0, false)
          .start();
      }
    };
    this.boom = function(obj) {
      boomTween = game.add.tween(obj)
        .to({ angle: 360 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, false)
        .start();
    }
    this.random = function(num) {
      var randomNum = Math.floor(Math.random() * num)
      return randomNum
    };
  }

  //舞台配置
  game.state.add('boot', game.States.boot);
  game.state.add('startup', game.States.startup);
  game.state.add('preload', game.States.preload);
  game.state.add('main', game.States.main);

  //主线程启动
  game.state.start('boot');
}

export default {
  name: 'init',
  components: {
    reset
  },
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
        shareType: false,
        gamePoint: null,
      },
      href: 'https://www.hxsapp.com/download',
      resetData: null,
      act_id: ''
    }
  },
  mounted() {
    var _this = this;
    this.$common.actjs.resizeWindow();
    this.$common.actjs.init(this.href);
    this.$common.common.preLoading("stressing");

    this.$nextTick(function() {
      // 挂载引擎

      // 注入全局数据
      // if (_this.$route.params.backTo) {
      //   _this.json = _this.$parent.$data.json
      // } else {
      //   _this.$parent.$data.json = _this.json
      // }
      _this.$parent.$data.json = _this.json
      gameEngine(_this, _this.json)
      var clientH = document.documentElement.clientHeight;
      $('html,body').css('height', clientH + 'px');
      $('#gameBox').css({
        'margin': '0',
        'padding': '0',
        'width': '100%',
        'height': clientH + 'px'
      })
    })
  },
  methods: {
    __resetListen() {
      console.log('listening')
    },
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
</style>
<style>
/* 在别的组件记得干掉这个样式 */

#gameBox {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>


