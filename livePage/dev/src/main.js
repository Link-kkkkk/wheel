// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'

import Router from 'vue-router'
import VueResource from 'vue-resource'
import router from './router'
import "babel-polyfill"

// 页面
import init from './init.vue'

// mint
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import { Spinner } from 'mint-ui';
Vue.component(Spinner.name, Spinner);

import { Lazyload } from 'mint-ui';
Vue.use(Lazyload,{
  preLoad: 1.6,
  loading: require('@/assets/img/loading.gif')
});

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'

// global
import "@/assets/common/animate.css"

import common from './assets/common/index'
Vue.prototype.$common = common

Vue.use(Router)
// Vue.use(MintUI)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

new Vue({
  el: '#index',
  router,
  render: e => e(init)
})

