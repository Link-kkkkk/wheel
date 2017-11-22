import Vue from 'vue'
import Router from 'vue-router'

// 页面
import init from '../init.vue'
import index from '../pages/index.vue'
import error from '../pages/error.vue'

// const reback = resolve => require(['../pages/rebackDraw.vue'],resolve)
// const intell = resolve => require(['../pages/intelligentFes.vue'],resolve)

import reback from '../pages/rebackDraw.vue'
import intell from '../pages/intelligentFes.vue'
import halloween from '../pages/halloween.vue'
import seckill from '../pages/seckill.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/reback',
      name: 'reback',
      component: reback
    },
    {
      path: '/intell',
      name: 'intell',
      component: intell
    },
    {
      path: '/halloween',
      name: 'halloween',
      component: halloween
    },
    {
      path: '/seckill',
      name: 'seckill',
      component: seckill
    },
    {
      path: '*',
      name: '404',
      component: error
    }
  ]
})