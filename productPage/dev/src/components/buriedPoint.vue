<template>

</template>

<script>
export default {
  name: 'buriedPoint',
  data() {
    return {
      json: {
        sess_token: this.$_GET('sess_token'),
        act_id: this.$_GET('id'),
        model_idfa: this.$_GET('model_idfa'),
      },
      buriedjson: {
        access_occurred_type: 110102,//发生访问的【页面】类型
        access_occurred_type_id: this.$_GET('id'),//发生访问的【页面】类型ID
        previous_event_type_obj: '',//【事件】对象类型
        previous_event_type_obj_id: '',//【事件】对象类型ID
        previous_content_sort: ''//【事件】事件参数
      },
      utime: this.$_GET('utime'),
      sign: this.$_GET('sign')
    }
  },
  mounted() {
    this.setRem()
    this.newburiedPoint()
  },
  methods: {
    setRem() {
      function e() {
        var e = document.documentElement.clientWidth,
          t = document.querySelector("html"),
          f = e / 25;
        window.fontSize = f;
        t.style.fontSize = f + "px";
      }
      e(), window.addEventListener("resize", e);
    },
    setBuried() {
      var _this = this
      this.newburiedPoint(this.buriedjson)
      window.hxsapp_visible_share_btn_mar = function() {
        _this.newburiedPoint(_this.buriedjson)
      }
    },
    newburiedPoint(json) {
      var buriedPoint = json;
      var params = '';

      for (var key in buriedPoint) {
        params += key + '=' + buriedPoint[key] + '&';
      }

      params = params.substring(0, params.length - 1);
      var marsImg = new Image();
      marsImg.src = 'https://mars.hxsapp.com/h5?' + params;
    },
    $_GET(key) {
      var p = window.location.href.split('?'),
        v = '';
      if (p.length < 2) {
        return false;
      }

      p = p[1].split('#');
      p = p[0].split('&');
      p.map(function(item) {
        var temp = item.split('=');
        if (temp[0] == key) {
          if (temp.length > 2) {
            for (var i in temp) {
              if (i > 0) {
                if (i > 1) {
                  v += ('=' + temp[i]);
                } else {
                  v += temp[i];
                }
              }
            }
          } else {
            v = temp[1];
          }
        }
      });
      return v;
    }
  }
}
</script>

<style>

</style>
