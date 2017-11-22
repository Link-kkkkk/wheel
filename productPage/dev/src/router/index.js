import Vue from 'vue'
import Router from 'vue-router'

// 页面
import init from '../init.vue'
import bodyCardio from '../pages/bodyCardio.vue'
import outCardio from '../pages/outCardio.vue'
import outBong from '../pages/outBong.vue'
import bong from '../pages/bong.vue'
import milk from '../pages/milkshake.vue'
import milkDetail from '../pages/milkshake2.vue'
import mealPowder from '../pages/mealPowder.vue'
import mealPowder2 from '../pages/mealPowder2.vue'
import error from '../pages/error.vue'
import index from '../pages/index.vue'
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
      path: '/bodyCardio',
      name: 'bodyCardio',
      component: bodyCardio
    },
    {
      path: '/bong',
      name: 'bong',
      component: bong
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
      path: "/mealPowder2",
      name: 'mealPowder2',
      component: mealPowder2
    },
    {
      path: '*',
      name: '404',
      component: error
    }
  ]
})