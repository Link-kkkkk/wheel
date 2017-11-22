<template>
  <div class="warp" id="gameBox">
    <down></down>
    <preload></preload>
    <share :actData='actData'></share>
    <foot v-show='footerShow'></foot>
  </div>
</template>

<script>
import foot from './../components/footNotice';
import down from './../components/down'
import preload from './../components/preload'
import share from './../components/shareInfo'
import com from './../util/common'
import pv from './../components/pv'

// phaser部分
import Vue from 'vue'
function gameEngine(vue, vueData) {
  var rootUrl;
  if (process.env.NODE_ENV === 'production') {
    rootUrl = 'https://act.hxsapp.com/html/linkup/dist/static/source/img/'
  } else {
    rootUrl = '../static/source/onway/'
  }

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
      // game.load.image('loadBg', rootUrl + 'bg.jpg')
      // game.load.image('loadLine', rootUrl + 'loadingLine.png')
      // game.load.image('loadLineIn', rootUrl + 'loadline.png')
    };
    this.create = function() {
      //预加载
      game.state.start('preload');
    };
  };

  // 加载舞台
  game.States.preload = function(game) {
    this.preload = function() {
      game.load.spritesheet('ball', rootUrl + 'balls.png', 17, 17)
      game.load.spritesheet('tank', rootUrl + 'tank.png', 48, 41)

      game.load.onFileComplete.add(function(progress) {
        if (progress == '100') {
          game.state.start('startup');
        }
      });
    }
  }

  game.States.startup = function(game) {
    var leftEmitter, rightEmitter, topEmitter;
    var tank, ani, cursors;

    var tankSign = 2
    var tankOp = false
    var point = 0
    this.create = function() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.stage.backgroundColor = '#0072bc';

      leftEmitter = game.add.emitter(50, game.world.centerY - 200);
      leftEmitter.bounce.setTo(0.5, 0.5);
      leftEmitter.setXSpeed(100, 200);
      leftEmitter.setYSpeed(-50, 50);
      leftEmitter.makeParticles('ball', 0, 100, 1, true);

      rightEmitter = game.add.emitter(game.world.width - 50, game.world.centerY - 200);
      rightEmitter.bounce.setTo(0.5, 0.5);
      rightEmitter.setXSpeed(-100, -200);
      rightEmitter.setYSpeed(-50, 50);
      rightEmitter.makeParticles('ball', 1, 100, 1, true);

      topEmitter = game.add.emitter(game.world.centerX, 0);
      topEmitter.bounce.setTo(0.5, 0.5);
      topEmitter.setXSpeed(-20, 20);
      topEmitter.setYSpeed(-20, 500);
      topEmitter.makeParticles('ball', 3, 500, 1, true);
      // explode, lifespan, frequency, quantity
      leftEmitter.start(false, 10000, 100);
      rightEmitter.start(false, 10000, 100);
      topEmitter.start(false, 10000, 200)
      tank = game.add.sprite(48, 41, 'tank', 4);
      game.physics.enable(tank, Phaser.Physics.ARCADE);
      tank.scale.set(tankSign);
      // tank.smoothed = false;
      tank.body.immovable = true;
      tank.inputEnabled = true;
      tank.events.onInputUp.add(this.lock);

      ani = tank.animations.add('walk');
      ani.play(10, true);

      cursors = game.input.keyboard.createCursorKeys()
    }

    this.update = function() {
      var ballArr = [leftEmitter, , rightEmitter, topEmitter]
      var ballArr2 = [tank]
      game.physics.arcade.collide(leftEmitter, rightEmitter, change, change, this);
      game.physics.arcade.collide(topEmitter, rightEmitter, change, change, this);
      game.physics.arcade.collide(topEmitter, leftEmitter, change, change, this);

      game.physics.arcade.collide(ballArr, ballArr2, hitTank, hitTank, this);

      if (cursors.left.isDown) {
        tank.x -= 5;
      }
      else if (cursors.right.isDown) {
        tank.x += 5;
      }

      if (cursors.up.isDown) {
        tank.y -= 5;
      }
      else if (cursors.down.isDown) {
        tank.y += 5;
      }
    }

    this.lock = function() {
      // tankSign = tankSign * 1.2
      // tank.scale.set(tankSign);
      if (tankOp) {
        tankOp = false
        tank.alpha = 1;
        tank.body.enable = true;
      } else {
        tankOp = true
        tank.alpha = 0.5;
        tank.body.enable = false;
      }
    }

    function change(a, b) {
      if (a.frame == 5 || b.frame == 5) {
        return
      }
      a.frame = 4;
      b.frame = 4;
    }

    function hitTank(a, b) {
      // a是tank
      // a.frame = 5;
      if (b.frame == 1 || b.frame == 2) {
        point += 1
        console.log(point)
      } else if (b.frame == 3) {
        point += 2
        console.log(point)
      } else if (b.frame == 4) {
        point += 5
        console.log(point)
      }

      b.alpha = .5;
      b.scale.set(1.2);
      b.body.enable = false;
      setTimeout(() => {
        b.destroy()
        addBall()
      }, 200)
      // b.frame = 5;
      console.log(a.position)
    }

    function addBall() {
      var newBall
      newBall = game.add.emitter(game.world.centerX + 250, 20);
      newBall.bounce.setTo(0.5, 0.5);
      newBall.setXSpeed(-50, -100);
      newBall.setYSpeed(-20, 500);
      newBall.makeParticles('ball', 3, 1, 1, true);
      newBall.frame = 5;
      newBall.start(false, 10000, 200)
    }
  }

  game.States.main = function(game) {

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
  name: 'onway',
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

      footerShow: false
    }
  },
  mounted() {
    var _this = this
    this.$nextTick(function() {
      // 挂载引擎
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
  }
}
</script>

<style>

</style>
