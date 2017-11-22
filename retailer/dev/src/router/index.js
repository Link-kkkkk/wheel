import Vue from 'vue'
import Router from 'vue-router'

// 页面
import init from '../init.vue'
import index from '../pages/index.vue'
import error from '../pages/error.vue'

import retailer from '../pages/retailerStore.vue'

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
      path: '/retailer',
      name: 'retailer',
      component: retailer
    },
    {
      path: '*',
      name: '404',
      component: error
    }
  ]
})