import Vue from 'vue'
import Router from 'vue-router'

// 页面
import index from '../pages/index.vue'

import game from '../pages/game.vue'
import newuserDraw from '../pages/newuserDraw.vue'
import olduserDraw from '../pages/olduserDraw.vue'
import rank from '../pages/ranking.vue'
import out from '../pages/outside.vue'

import onway from '../pages/onWay.vue'
// import error from '../pages/error.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  // base:'/actweb/linkup',
  routes: [
    {
      path: '/',
      redirect: '/index/game'
    },
    {
      path: '/index/:rute',
      name: 'index',
      component: index
    },
    {
      path: '/onway',
      name: 'onway',
      component: onway
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/newuserDraw',
      name: 'newuserDraw',
      component: newuserDraw
    },
    {
      path: '/olduserDraw',
      name: 'olduserDraw',
      component: olduserDraw
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/out',
      name: 'out',
      component: out
    },
    {
      path: '*',
      component: index
    }
  ]
})