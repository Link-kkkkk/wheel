// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import init from './init'
import router from './router'
import VueResource from 'vue-resource'
import "babel-polyfill"

Vue.config.productionTip = false

Vue.use(router)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  render: e => e(init)
})
