<template>
  <div class="warp">
    <!-- <button @click="backToDraw">back to draw</button> -->
    <div class="headBg"></div>
    <div class="head" v-show="!userIn"></div>
    <div class="inHead" v-show="userIn">
      <img :src='userHeadImg'>
    </div>
    <div class="userName">{{userName}}</div>
    <div class="textBox">
      <p>我在好享瘦参加《享瘦消消看》</p>
      <p>挑战成功并抽中了
        <span>{{userGift}}</span>
      </p>
      <div class="imgbox">
        <img :src="userGiftUrl">
      </div>
      <div class="showBtn" @click='goPlay()'></div>
    </div>
  </div>
</template>
<script>
import localmock from './../components/mock';
export default {
  name: 'init',
  components: {
    localmock
  },
  data() {
    return {
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa'),
      },
      href: 'https://www.hxsapp.com/download',
      mockdataToMock: null,
      userName: '',
      userGift: '',
      userGiftUrl: '',
      act_id: '',
      userHeadImg: '',
      userIn: false,
      userId: '',
      shareSend: null
    }
  },
  mounted() {
    var _this = this;
    this.$common.actjs.resizeWindow();
    this.$common.actjs.init(this.href);
    this.$common.common.preLoading("stressing");

    var clientH = document.documentElement.clientHeight;
    $('html,body,.warp').css('height', clientH + 'px');


    this.act_id = _this.$common.common.$_GET('id')

    this.$nextTick(function() {
      if (_this.$parent.$data.json.id) {
        _this.json = _this.$parent.$data.json
      } else {
        _this.$parent.$data.json.act_id = _this.json.act_id
      }

      if (_this.$common.common.$_GET('sess_token').length > 10) {
        _this.userIn = true
        _this.userId = _this.$route.params.uu
      }else{
        _this.userId = _this.$common.common.$_GET('uu')
      }
      this.shareSend = {
        user_id: _this.userId,
        act_id: _this.$common.common.$_GET('id')
      }

      setTimeout(function() {
        _this.getInfo()
      }, 200)
    })
  },
  methods: {
    goPlay() {
      var _this = this
      this.$router.push({
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

    getInfo() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/userShareData', {
        params: {
          act_id: _this.json.act_id,
          user_id: _this.userId
        }
      })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.userIn = true
            _this.userName = data.data.data.nickname
            _this.userHeadImg = data.data.data.head_img
            _this.userGift = data.data.data.award_name
            _this.userGiftUrl = data.data.data.award_image
          } else {
            _this.userIn = false
            _this.userName = _this.$parent.$data.nickname
            _this.userHeadImg = _this.$parent.$data.userHeadImg
            _this.userGift = _this.$parent.$data.userGift
            _this.userGiftUrl = _this.$parent.$data.userGiftUrl
          }

          _this.$http.jsonp(_this.$common.common._ACTHOST + '/eliminateMusic/Mod/actInfo', { params: _this.json })
            .then(function(data) {
              if (data.data.code == 200) {
                this.$common.actjs.shareFun(
                  data.data.data,
                  _this.$common.common._ACTHOST + '/html/linkup/dist/index.html?rute=out&id=' + _this.json.act_id + '&uu=' + _this.userId
                  // '我在好享瘦参加《享瘦消消乐》挑战成功并免费领取了' + _this.userGift
                );
                _this.pageTitle = data.data.data.title
                document.title = data.data.data.title
              }
            })
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
@import './../assets/common/out.less';
</style>


