import Vue from 'vue'
import Router from 'vue-router'

// 页面
import init from '../init.vue'
import index from '../pages/index.vue'
import error from '../pages/error.vue'

import seckill from '../pages/seckill.vue'
Vue.use(Router)

export default new Router({
  mode:'history',
  base:'/actweb/seckill/',
  routes: [
    {
      path: '/index',
      component: index
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