import Vue from 'vue'
import Router from 'vue-router'

// 页面
import init from '../init.vue'
// const bongPage = resolve => require(['../pages/bong.vue'],resolve)
// const bodyCardio = resolve => require(['../pages/bodyCardio.vue'],resolve)
// const outBong = resolve => require(['../pages/outBong.vue'],resolve)
// const outCardio = resolve => require(['../pages/outCardio.vue'],resolve)
// const milk = resolve => require(['../pages/milkshake.vue'],resolve)
// const milkDetail = resolve => require(['../pages/milkshake2.vue'],resolve)
// const mealPowder = resolve => require(['../pages/mealPowder.vue'],resolve)

import error from '../pages/error.vue'
import index from '../pages/index.vue'

import seckill from '@/pages/seckill.vue'
import invite from '@/pages/inviteFriend.vue'

// demo
import vuegPage from '@/pages/vueg.vue'
import fetchPage from '@/pages/fetchDemo.vue'
import loadmore from '@/pages/mintLoadmore.vue'
import slotDemo from '@/pages/slotDemo.vue'
import promiseDemo from '@/pages/promise.vue'

Vue.use(Router)
export default new Router({
  mode:'history',
  base:'/',
  routes: [
    {
      // nginx路径
      path: '/',
      redirect: '/vueg'
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
      path: '/promiseDemo',
      name: 'promiseDemo',
      component: promiseDemo
    },
    {
      path: '/slotDemo',
      name: 'slotDemo',
      component: slotDemo
    },
    {
      path: '*',
      name: '404',
      component: error
    }
  ]
})