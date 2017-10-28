import Vue from 'vue'
import Router from 'vue-router'

// 页面
import init from '../init.vue'
// import bodyCardio from '../pages/bodyCardio.vue'
// import outCardio from '../pages/outCardio.vue'
// import outBong from '../pages/outBong.vue'
// import milk from '../pages/milkshake.vue'
// import milkDetail from '../pages/milkshake2.vue'
// import mealPowder from '../pages/mealPowder.vue'
// import bong from '../pages/bong.vue'
const bongPage = resolve => require(['../pages/bong.vue'],resolve)
const bodyCardio = resolve => require(['../pages/bodyCardio.vue'],resolve)
const outBong = resolve => require(['../pages/outBong.vue'],resolve)
const outCardio = resolve => require(['../pages/outCardio.vue'],resolve)
const milk = resolve => require(['../pages/milkshake.vue'],resolve)
const milkDetail = resolve => require(['../pages/milkshake2.vue'],resolve)
const mealPowder = resolve => require(['../pages/mealPowder.vue'],resolve)

import error from '../pages/error.vue'
import index from '../pages/index.vue'

// demo
import vuegPage from '@/pages/vueg.vue'
import fetchPage from '@/pages/fetchDemo.vue'
import loadmore from '@/pages/mintLoadmore.vue'
import slotDemo from '@/pages/slotDemo.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/vueg'
    },
    {
      path: '/index/:type',
      name: 'index',
      component: index
    },
    {
      path: '/vueg',
      name: 'vueg',
      component: vuegPage
    },
    {
      path: '/fetch',
      name: 'fetch',
      component: fetchPage
    },
    {
      path: '/loadmore',
      name: 'loadmore',
      component: loadmore
    },
    {
      path: '/slotDemo',
      name: 'slotDemo',
      component: slotDemo
    },
    {
      path: '/bodyCardio',
      name: 'bodyCardio',
      component: bodyCardio
    },
    {
      path: '/bong',
      name: 'bong',
      component: bongPage
    },
    {
      path: '/outCardio',
      name: 'outCardio',
      component: outCardio
    },
    {
      path: '/outBong',
      name: 'outBong',
      component: outBong
    },
    {
      path: '/milk',
      name: 'milk',
      component: milk,
    },
    {
      path: "/milkDetail",
      name: 'milkDetail',
      component: milkDetail
    },
    {
      path: "/mealPowder",
      name: 'mealPowder',
      component: mealPowder
    },
    {
      path: '*',
      name: '404',
      component: error
    }
  ]
})