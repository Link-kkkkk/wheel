<template>
  <div class="warp">
    <preload></preload>
    <button @click='demo_1()'>sendAjax</button>
  </div>
</template>
<script>
import preload from '@/components/preload'

import com from '@/util/common'
export default {
  name: 'promiseDemo',
  data() {
    return {
      out: false
    }
  },
  mounted() {
    var _this = this
  },
  methods: {
    demo_1(type) {
      function timeout(ms) {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, ms, 'done');

          // 错误语法 用于catch
          // setTimeout(resolve, ms, abcd)
        });
      }

      timeout(100).then((value) => {
        console.log('start')
        console.log('----------')
        timeout(1000).then((value) => {
          console.log('sending')
          console.log('----------')
          timeout(1000).then((value) => {
            console.log('receving')
            console.log('----------')
            timeout(1000).then((value) => {
              console.log(value);
            })
          })
        })
        //catch能抓住回调的错误
      }).catch(function(error) {
        console.log('发生错误！', error);
      })
    },
  },
  components: {
    preload
  }
}

</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';

.warp button {
  padding: 2rem;
  font-size: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  outline: none;
  background: linear-gradient(150deg, #a8edea 0%, #fed6e3 100%);
}
</style>

