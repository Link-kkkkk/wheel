<template>
  <div class="warp">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in list" :key='item'>{{ item }}</li>
    </ul>
    <div class="loadingNotice" v-show='loading'>
      <mt-spinner type="double-bounce" color='rgba(150, 0, 0, 1)'></mt-spinner>
      <p>加载中...</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'init',
  data() {
    return {
      loading: false,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2000);
    },
  }
}
</script>

