<template>
  <div class="wrapper">
    <div class="boxArea">
      <div class="box" :style='sendStyle'></div>
      <div class="box2" :style='sendStyle'></div>
    </div>
  </div>
</template>
<script>
import com from "./../util/common";

export default {
  name: "index",
  data() {
    return {
      reciveStyle: null
    };
  },
  props: {
    sendStyle: {
      type: [Object, String],
      default: function() {
        return {
          style: null
        };
      }
    }
  },
  mounted() {
    console.log(this.sendStyle);
  }
};
</script>
<style lang="less" scoped>
.boxArea{
  position: relative;
  width: 100%;
}
.box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  animation:move 5s infinite;
  -webkit-animation:move 5s infinite;
  top: 100px;
}
.box2{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  animation:move2 10s infinite;
  -webkit-animation:move2 10s infinite;
  top: 100px;
}
@keyframes move {
  0% {
    top: 100px;
    right: 200px;
  }
  25% {
    top: 200px;
    right: 100px;
  }
  50% {
    top: 300px;
    right: 0;
  }
  75% {
    top: 200px;
    right: 100px;
  }
  100% {
    top: 100px;
    right: 200px;
  }
}
@keyframes move2 {
  0% {
    top: 150px;
    right: 150px;
  }
  25% {
    top: 250px;
    right: 250px;
  }
  50% {
    top: 350px;
    right:350px;
  }
  75% {
    top: 250px;
    right: 150px;
  }
  100% {
    top: 150px;
    right: 150px;
  }
}
</style>


