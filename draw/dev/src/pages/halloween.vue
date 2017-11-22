<template>
  <div class="warp">
    <preload></preload>
    <down downLink='href'></down>
    <share :actData='actData'></share>
    <div class="box_1"></div>
    <div class="box_2">
      <input class="nameIn" v-model="userName" type="text" placeholder="请输入中文或英文" maxlength="12">
      <input class="phoneIn" v-model="userPhone" type="tel"  placeholder="请输入手机号码" maxlength="11">
    </div>
    <div class="box_3">
      <div class="btn" @click='commit()'></div>
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
      userPhone: ''
    }
  },
  mounted() {
    var _this = this

    this.$nextTick(() => {
      // _this.pv()
    })

    window.appShareCallback = function() {
      _this.clearLayer()
    }
  },
  methods: {
    init() {

    },
    // pv() {
    //   var _this = this
    //   this.$http.jsonp(_this.$common.common._ACTHOST + '/base/Api/pv', { params: _this.json })
    //     .then(function(data) {
    //       if (data.data.code == 200) {
    //         _this.pvnum = data.data.data.sum
    //       }
    //     })
    // },
    commit: function(name,phone) {
      let _this = this
      var chinese = new RegExp(/^([\u4E00-\u9FA5|a-zA-Z])+$/);
      var mobile = new RegExp(/0?(13|14|15|17|18)[0-9]{9}/);

      var chineseReg = chinese.test(_this.userName);
      var mobileReg = mobile.test(_this.userPhone);

      if (_this.userName == '') {
        com.toastTip('姓名不能为空', 2000)
        return false
      } else if (_this.userPhone == '') {
        com.toastTip('电话不能为空', 2000)
        return false
      }
      // else if (!chineseReg) {
      //   com.toastTip('请输入带中文或26个英文字母的姓名', 2000)
      //   return false
      // }
      else if (!mobileReg) {
        com.toastTip('您输入的手机号码有误', 2000)
        return false
      }
      var sendData = {
        name: _this.userName,
        mobile: _this.userPhone,
        act_id: _this.json.act_id,
        sess_token: _this.json.sess_token
      }
      this.$http.jsonp(_this.$common.common._ACTHOST + '/actHallowmasCandies/ActHallowmasCandies/getUserApplyActivity', { params: sendData })
        .then(function(data) {
          com.toastTip(data.data.msg,2000)
          if(data.data.code==200){
            setTimeout( ()=> {
              window.location.href='https://hxsapp_close';
            },4000)
          }
        })
    },
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
.warp {
  position: relative;
}

.box_1 {
  background: url('./../assets/img/halloween/bg_1.jpg') left top no-repeat;
  .rback(100%,
  26.83rem);
}

.box_2 {
  background: url('./../assets/img/halloween/bg_2.jpg') left top no-repeat;
  .rback(100%,
  18.9rem);
  input {
    background-color: #b3acbc;
    outline: none;
    border: none;
    resize: none;
    -webkit-appearance: none;
    position: absolute;
    left: 5.25rem;
    width: 16.7rem;
    height: 1.85rem;
    font-size: 1rem;
  }
  input::input-placeholder,
  input::-webkit-input-placeholder {
    color:red;
    font-size: 1rem;
    /*height: 1.2rem;*/
    line-height: normal;
    vertical-align: middle;
  }
}

.box_3 {
  background: url('./../assets/img/halloween/bg_3.jpg') left top no-repeat;
  .rback(100%,
  25.37rem);
  .btn {
    background: url('./../assets/img/halloween/btn.png') left top no-repeat;
    .rback(10.57rem,
    2.47rem);
    .center(10.57rem);
    position: absolute;
    top: 1.5rem;
  }
}

.nameIn {
  top: 9rem;
}

.nameIn::-webkit-input-placeholder,
.phoneIn::-webkit-input-placeholder
{
  color:#444;
}
.phoneIn {
  top: 12.2rem;
}

.noticeWarp{
  color:#000
}
</style>

