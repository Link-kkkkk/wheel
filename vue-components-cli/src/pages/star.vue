<template>
  <div class="starContent">
    <div class="mainWord" :style='boxBack'>
      <p>here is {{word}}</p>
    </div>
    <el-button class="changeBtn" :style='boxBack' type="primary" @click='change()'>click too change components</el-button>
    <keep-alive>
      <component :sendStyle='boxBack' :is='ballbox'></component>
    </keep-alive>
  </div>
</template>
<script>
import Vue from 'vue'
// import ball from "./ball";
import ball2 from "./twoBall";

// Vue.component('ball', function (resolve) {
//   // 这个特殊的 require 语法告诉 webpack
//   // 自动将编译后的代码分割成不同的块，
//   // 这些块将通过 Ajax 请求自动下载。
//   require(["./ball"], resolve)
// })

const ball = () => ({
  // 需要加载的组件。应当是一个 Promise
  component: import("./ball"),
  // 加载中应当渲染的组件
  loading: ball2,
  // 出错时渲染的组件
  error: ball2,
  // 渲染加载中组件前的等待时间。默认：200ms。
  delay: 200,
  // 最长等待时间。超出此时间则渲染错误组件。默认：Infinity
  timeout: 3000
})

export default {
  name: "star",
  components: {
    one: ball,
    two: ball2
  },
  data() {
    return {
      word: "",
      boxBack: null,
      sendStyle: null,
      ballbox: "one"
    };
  },
  created() {},
  mounted() {
    this.word = this.$route.name;

    var sheet = this.$store.state.routerSheet;
    for (let i = 0; i < sheet.length; i++) {
      if (this.word === sheet[i].name) {
        this.boxBack = {
          background: sheet[i].style
        };
      }
    }
  },
  methods: {
    change() {
      if (this.ballbox == "one") {
        this.ballbox = "two";
      } else {
        this.ballbox = "one";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mainWord {
  text-align: center;
  // margin: 30px auto;
  font-size: 45px;
  padding: 5px 0 100px 0;
  border-radius: 10px;
}

.changeBtn {
  outline: none;
  border: none;
  margin-top: 10px;
  padding: 20px;
}
</style>

