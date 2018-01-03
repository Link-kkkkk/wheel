<template>
  <div class="wrapper">
    <div class="boxArea">
      <div class="box" :style='sendStyle'></div>
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

@keyframes move {
  0% {
    top: 100px;
    left: 0;
  }
  25% {
    top: 200px;
    left: 100px;
  }
  50% {
    top: 300px;
    left: 200px;
  }
  75% {
    top: 200px;
    left: 100px;
  }
  100% {
    top: 100px;
    left: 0;
  }
}
</style>


