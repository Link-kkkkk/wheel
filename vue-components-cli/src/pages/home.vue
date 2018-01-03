<template>
  <div class="homeContent">
    <el-row>
      <el-col :span="24"><p class="header">home component</p></el-col>
    </el-row>
    <el-button :type="loginBtnObj.type" @click='login'>{{loginBtnObj.text}}</el-button>
    <el-button type="primary" plain @click='sign' v-if='loginType == "guest"'>注册</el-button>
    <transition name='switch'>
      <el-row class="routerBox" v-if='loginType == "master"'>
        <el-col v-for='(item,index) in $store.state.userRouterSheet' :key='item' @click.native='goRouter(item)' :span="16" class="routerBoxLine" :style='"background:" + $store.state.routerSheet[index].style'>
          <p>{{item}}</p>
        </el-col>
      </el-row>
    </transition>
    <transition name='switch'>
      <el-row class="routerBox" v-if='loginType == "guest"'>
        <el-col @click.native='guestClick()' :span="16" class="routerBoxLine guestBtn">
          <p>guestMode</p>
        </el-col>
      </el-row>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Lockr from "lockr";
import com from "./../util/common"

export default {
  name: "home",
  data() {
    return {
      loginBtnObj: {
        type: "primary",
        text: "登陆"
      },
      routerBtnArr: [],
      loginType: "guest",
      logining: false
    };
  },
  mounted() {
    this.load();
    this.routerBtnArr = this.$store.state.userRouterSheet;
  },
  methods: {
    load() {
      this.logining = this.$store.state.login;
      if (!this.logining) {
        if (Lockr.get("login") === "true") {
          this.logining = true;
          this.$store.dispatch("UserLogin");
        }
      }

      if (this.logining) {
        this.loginType = "master";
        this.loginBtnObj.type = "danger";
        this.loginBtnObj.text = "登出";
      } else {
        this.loginType = "guest";
        this.loginBtnObj.type = "primary";
        this.loginBtnObj.text = "登陆";
      }
    },
    login() {
      let userLogin = this.$store.state.login;
      if (!userLogin && Lockr.get("login") === "false") {
        if(this.$store.state.routerLoaded === false){
          com.loadingRouter();
        }
      }

      if (!userLogin) {
        this.open(1);
        this.loginType = "master";
        this.logining = "true";
        this.$store.dispatch("UserLogin");

        this.loginBtnObj.type = "danger";
        this.loginBtnObj.text = "登出";
      } else if (userLogin) {
        this.open(2);
        this.loginType = "guest";
        this.logining = "false";
        this.$store.dispatch("UserLogout");

        this.loginBtnObj.type = "primary";
        this.loginBtnObj.text = "登陆";
      }
    },
    open(type) {
      switch (type) {
        case 1:
          var alertType = "success";
          var alertTxt = "登陆成功";
          break;
        case 2:
          var alertType = "warning";
          var alertTxt = "登出成功";
          break;
        default:
          console.log("no type");
      }
      this.$message({
        message: alertTxt,
        type: alertType
      });
    },
    goRouter(route) {
      this.$router.push({ name: route });
    },
    guestClick() {
      this.$alert("没有知识的荒原", "登陆先喂", {
        confirmButtonText: "confirm"
      });
    },
    sign() {
      this.$alert("暂时没有使用数据库", "oh!", {
        confirmButtonText: "confirm"
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./../util/reset.less";
@import "./../util/animate.css";

.routerBox {
  margin: 50px 20px;
}
.routerBoxLine {
  cursor: pointer;
  margin: 5px auto;
  padding: 20px;
  border-radius: 20px;
}

.guestBtn {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
}

.switch-enter-active {
  animation-name: slideInLeft;
  animation-duration: 0.5s;
}
.switch-leave-active {
  animation-name: slideOutLeft;
  animation-duration: 0.5s;
}
</style>


