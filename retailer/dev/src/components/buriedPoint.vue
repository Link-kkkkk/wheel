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
    newburiedPoint(jsons) {
      var ua = window.navigator.userAgent;
      //判断是非在app里的方法
      function isApp() {
        var is_sess_token;
        if (window.location.search.indexOf('sess_token') >= 0) {
          is_sess_token = true;
        } else {
          is_sess_token = false;
        }

        // app下面的调试模式
        if ((window.location.search.indexOf('displayThumbBtn') >= 0 && getUrlParam('displayThumbBtn') == 0) || is_sess_token) {

          console.log("在app里，且已经登录了")
          return true
        } else {
          console.log("在app里，且没有登录了")
          return false
        }
      }

      function getUaparen(key) {
        var p = window.navigator.userAgent;
        var v = '';
        p = p.split('&');
        p.map(function(item) {
          var temp = item.split('-');
          if (temp[0] == key) {
            if (temp.length > 2) {
              for (var i in temp) {
                if (i > 0) {
                  if (i > 1) {
                    v += ('-' + temp[i]);
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

      var newMobileSystem = getUaparen('mobile_system');
      var newBrand = getUaparen('brand');
      var newModel = getUaparen('model');
      var newSystemResolution = getUaparen('system_resolution');
      var newChannelNumber = getUaparen('channel_number');
      var newVersionNumber = getUaparen('version_number');
      var newNetworkEnvironment = getUaparen('network_environment');
      var newLongitude = getUaparen('longitude');
      var newLatitude = getUaparen('latitude');
      var newRegisterId = getUaparen('register_id');
      var newConversationId = getUaparen('conversation_id');
      var newUserId = getUaparen('user_id');

      //判断在那个场景打开页面
      var MicroMessenger = new RegExp('MicroMessenger').test(ua);
      var previousWebType = MicroMessenger ? '微信' : '其他';
      if (isApp()) previousWebType = 'app内已设置类型';

      var uaPoint = {
        'mobile_system': newMobileSystem,
        'brand': newBrand,
        'model': newModel,
        'system_resolution': newSystemResolution,
        'channel_number': newChannelNumber,
        'version_number': newVersionNumber,
        'network_environment': newNetworkEnvironment,
        'longitude': newLongitude,
        'latitude': newLatitude,
        'register_id': newRegisterId,
        'conversation_id': newConversationId,
        'user_id': newUserId,
        'previous_web_type': previousWebType
      }
      var json = {
        access_occurred_type: 110102,//发生访问的【页面】类型
        access_occurred_type_id: this.$_GET('id'),//发生访问的【页面】类型ID
        previous_event_type_obj: '',//【事件】对象类型
        previous_event_type_obj_id: '',//【事件】对象类型ID
        previous_content_sort: ''//【事件】事件参数
      }
      var buriedPoint = Object.assign(json, uaPoint);
      var params = '';

      for (var key in buriedPoint) {
        params += key + '=' + buriedPoint[key] + '&';
      }
      params = params.substring(0, params.length - 1);
      console.log(params)
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
