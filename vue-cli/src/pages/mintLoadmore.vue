<template>
  <!-- 拖动就会触发加载方法，目前无法解决 -->
  <div class="warp" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <!-- top-method="loadTop" 头部加载 -->
    <!-- distanceIndex 	手指移动与组件移动距离的比值 -->
    <div>
      <p>title</p>
    </div>
    <mt-loadmore :auto-fill='false' @bottom-status-change="handleBottomChange" @top-status-change="handleTopChange" :top-method="loadBottom" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomPullText='pullText' :bottomDropText='dropText' :bottomLoadingText='loadingText' ref="loadmore" class="loadBox">
      <ul class="loadText">
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
      <!-- <div slot="top" class="mint-loadmore-top">
                        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                        <span v-show="topStatus === 'loading'">Loading...</span>
                      </div> -->
      <!-- <div slot='bottom' class="mint-loadmore-bottom">
                          <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓ 下拉刷新</span>
                          <span v-show="bottomStatus === 'loading'">Loading...</span>
                        </div> -->
    </mt-loadmore>
  </div>
</template>
<script>
export default {
  name: 'mint-loadmore',
  data() {
    return {
      comName: 'mint-loadmore',
      topStatus: '',
      bottomStatus: '',

      pullText: '上拉加载更多...',
      dropText: '释放加载',
      loadingText: 'loading...',

      toTop: 0,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ci: 10,
      allLoaded: false,
      scrollMode: 'touch'
    }
  },
  mounted() {
    var _this = this
    this.$nextTick(() => {
      console.log(this.comName)
      document.title = this.comName
    })
  },
  methods: {
    handleTopChange: function(status) {
      this.topStatus = status;
      // console.log("this.topStatus = " + status);
    },

    handleBottomChange: function(status) {
      this.bottomStatus = status;
      // console.log("this.bottomStatus = status; " + status);
    },

    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      var _this = this
      setTimeout(() => {
        for (var i = 0; i < 10; i++) {
          _this.ci++
          _this.list.push(_this.ci)
        }
        // _this.toTop += 220
        // $('.loadText').scrollTop(_this.toTop);
      }, 1500)
      this.$refs.loadmore.onBottomLoaded();
      // this.allLoaded = true;// 若数据已全部获取完毕
    },
  },

}
</script>
<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

.warp {
  height: 100%;
  overflow: scroll;
}

.loadBox {
  // height: 500px;
}

.loadText {
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom:20px;
}

.loadText li {
  line-height: 120px;
  font-size: 60px;
  text-align: center;
}
</style>