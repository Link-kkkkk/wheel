// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuex from 'vuex'
import init from './init'
import router from './router'
import VueResource from 'vue-resource'

import "babel-polyfill"
import store from "./store/store"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Lockr from "lockr";

Vue.config.productionTip = false

Vue.use(router)
Vue.use(VueResource)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  store, // 这里记得注入
  render: e => e(init)
})
