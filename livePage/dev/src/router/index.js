import Vue from 'vue'
import Router from 'vue-router'

// 页面
import init from '../init.vue'
import error from '../pages/error.vue'
import index from '../pages/index.vue'

import live from '../pages/livePage.vue'
import hallolive from '../pages/livePage_2.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/live',
      name: 'live',
      component: live
    },
    {
      path: '/hallolive',
      name: 'hallolive',
      component: hallolive
    },
    {
      path: '*',
      name: '404',
      component: error
    }
  ]
})