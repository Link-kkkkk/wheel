<template>
  <div class="warp">
    <down v-if='out'></down>
    <preload></preload>
  </div>
</template>
<script>
import down from './../components/down'
import preload from '@/components/preload'

export default {
  name: 'fetchDemo',
  data() {
    return {
      out: false
    }
  },
  mounted() {
    this.$common.common.resizeWindow();
    this.$common.common.init(this.href);

    var _this = this

    var fetchUrl = _this.$common.common._ACTHOST + '/base/Api/actInfo'
    var sendStr = 'act_id=' + '108' + '&sess_token=' + '1234'

    var sendForm = new FormData()
    sendForm.append('act_id','108')

    var fetchTar = new Request(fetchUrl, {
      method: 'POST',
      mode: 'cors',
      cache: 'reload',
      headers: {
        // "Content-type": "application/json"
        // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: sendForm
    })

    fetch(fetchTar).then(response => response.json())
      .then(data => console.log(data))
      .catch(e => console.log("Oops, error", e))
  },
  methods: {

  },
  components: {
    down,
    preload
  }
}
</script>
<style lang="less" scoped>
@import './../assets/common/reset.less';
</style>

